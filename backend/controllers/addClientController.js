import AddClient from "../models/addClient.model.js";
import { Op } from "sequelize"; // Import for complex query logic
import axios from "axios";
import ServiceRequest from "../models/serviceRequest.model.js";

const formatNotWorkingHours = (totalHours) => {
    if (typeof totalHours !== 'number' || totalHours < 0) {
        return "0 hrs";
    }
    
    const days = Math.floor(totalHours / 24);
    const hours = Math.round(totalHours % 24); // Use Math.round for a cleaner hour display
    
    // Build the string
    let result = [];
    if (days > 0) {
        result.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (hours > 0) {
        result.push(`${hours} hr${hours > 1 ? 's' : ''}`);
    }
    
    // If both are zero, return "0 hrs"
    if (result.length === 0) {
        return "0 hrs";
    }

    return result.join(' ');
};

export const getClients = async (req, res) => {
  try {
    const { search } = req.query; // <-- Get the search term
    
    let whereClause = {};
    if (search) {
      const searchTerm = `%${search}%`; // Use wildcards for LIKE query
      // Filter clients where UserName OR company contains the search term
      whereClause = {
        [Op.or]: [
          { UserName: { [Op.like]: searchTerm } },
          { company: { [Op.like]: searchTerm } },
        ],
      };
    }
    
    // Crucial for performance: Limit the number of results returned for a search
    const limit = 50; 

    const clients = await AddClient.findAll({
      where: whereClause, // Apply the search filter
      attributes: ["id", "Userid", "UserName", "company", "sys_group_id"],
      order: [["UserName", "ASC"]],
      limit: limit, // Limit the response size
    });
    
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch clients" });
  }
};

// ----------------------------------------------------------------------------------

export const getNotWorkingVehicles = async (req, res) => {
    try {
        const { clientId } = req.query; // clientId is now a comma-separated string (e.g., "1,4,6")

        if (!clientId) {
            return res.status(400).json({ success: false, message: "Client ID(s) missing" });
        }

        // 1. Split the comma-separated string into an array of IDs
        const clientIdsArray = clientId.split(',').map(s => s.trim()).filter(id => id.length > 0);

        if (clientIdsArray.length === 0) {
            return res.status(400).json({ success: false, message: "No valid client IDs provided" });
        }
        
        // 2. Fetch ALL client records needed
        const clients = await AddClient.findAll({
            where: { Userid: { [Op.in]: clientIdsArray } }, // Use Op.in to fetch multiple clients
            attributes: ["Userid", "sys_group_id"],
        });

        if (clients.length === 0) {
            return res.status(404).json({ success: false, message: "None of the clients were found" });
        }

        let allApiVehicles = [];
        let apiVehicleRegNos = [];
        
        // 3. Iterate through each client and call the Gtrac API
        for (const client of clients) {
            try {
                const response = await axios.get(
                    `https://gtrac.in:8089/trackingDashboard/getListVehiclesmob`,
                    {
                        params: {
                            token: client.sys_group_id,
                            userid: client.Userid, // Use the specific Userid for this client
                            puserid: 1,
                            mode: "NOT WORKING",
                        },
                    }
                );

                const data = response.data;
                
                if (data.success && Array.isArray(data.list)) {
                    allApiVehicles.push(...data.list); // Merge the lists
                    apiVehicleRegNos.push(...data.list.map(v => v.vehReg).filter(Boolean));
                }
            } catch (apiError) {
                console.error(`Error calling Gtrac API for client ${client.Userid}:`, apiError.message);
                // Continue to the next client even if one API call fails
            }
        }
        
        // Remove duplicates if the API might return the same vehicle for different client tokens/users.
        // This assumes 'vehReg' is the unique identifier.
        const uniqueVehiclesMap = new Map();
        for (const vehicle of allApiVehicles) {
            if (vehicle.vehReg) {
                uniqueVehiclesMap.set(vehicle.vehReg, vehicle);
            }
        }
        const uniqueApiVehicles = Array.from(uniqueVehiclesMap.values());
        const uniqueApiVehicleRegNos = Array.from(uniqueVehiclesMap.keys());


        // 4. Fetch the LATEST 'Raised' Service Requests from your DB for ALL unique vehicles
        let latestRequestsMap = {};
        
        if (uniqueApiVehicleRegNos.length > 0) {
            const statusRequests = await ServiceRequest.findAll({
                where: {
                    [Op.or]: uniqueApiVehicleRegNos.map(regNo => ({
                        // Check if the comma-separated vehicleNo column CONTAINS the current regNo.
                        vehicleNo: { [Op.like]: `%${regNo}%` }, 
                    })),
                    status: 'Raised', 
                },
                attributes: ['vehicleNo', 'status', 'createdAt'],
                order: [['createdAt', 'DESC']],
            });

            // Process fetched requests to create a lookup map
            statusRequests.forEach(request => {
                const vehicleList = request.vehicleNo.split(',').map(s => s.trim()).filter(Boolean);
                const status = request.status;

                vehicleList.forEach(regNo => {
                    // Only map if the status for this vehicle hasn't been set yet (ensures we get the latest based on the 'ORDER BY DESC' in the query)
                    if (!latestRequestsMap[regNo]) { 
                        latestRequestsMap[regNo] = status;
                    }
                });
            });
        }
        
        // 5. Map ALL unique API data and MERGE with the request status
        const vehicles = uniqueApiVehicles.map((v) => {
            const totalHours = v.gpsDtl?.notworkingHrs || 0;
            const regNo = v.vehReg;

            return {
                vehicleNo: regNo,
                imei: v.controllermergeId || "N/A",
                lastServiceDate: v.dateOfinstallation,
                lastContactTime: v.gpsDtl?.latLngDtl?.gpstime || "N/A",
                lastServiceReason: v.veh_status || v.vehicleState || "N/A",
                networkingDays: formatNotWorkingHours(totalHours), 
                latLong: v.gpsDtl?.latLngDtl?.latlong || "N/A",
                temp: v.gpsDtl?.temperature || 0,
                
                // Status Merged from DB: 
                requestStatus: latestRequestsMap[regNo] || 'None', 
            };
        });

        res.json({ success: true, vehicles });
    } catch (error) {
        console.error("Error fetching NOT WORKING vehicles:", error); 
        res.status(500).json({ success: false, message: "Failed to fetch vehicles" });
    }
};