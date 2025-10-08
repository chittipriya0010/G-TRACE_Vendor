import ServiceRequest from "../models/serviceRequest.model.js";

// POST - Save request (Updated for Status and potentially multiple vehicles)
export const createServiceRequest = async (req, res) => {
    try {
        const {
            username,
            vehicleNo, // This now contains a comma-separated string of vehicle numbers
            company,   // You included 'company' in the frontend requestData, so include it here
            problem,
            contactPerson,
            contactNumber,
            serviceLocation,
            date,
            recommendedAction,
        } = req.body;

        // 💡 Enhancement 1: Define the initial status
        const initialStatus = 'Raised'; 

        const newRequest = await ServiceRequest.create({
            username,
            vehicleNo, // Store the comma-separated string
            company,
            problem,
            contactPerson,
            contactNumber,
            serviceLocation,
            date,
            recommendedAction,
            status: initialStatus, // 💡 Enhancement 2: Save the initial status
        });

        // 💡 Enhancement 3: Return the status in the response
        res.status(201).json({ 
            success: true, 
            request: newRequest,
            status: initialStatus // Return the set status 
        });
    } catch (error) {
        // Use a more specific error for debugging
        console.error("Error creating service request:", error); 
        res.status(500).json({ success: false, message: "Failed to create request" });
    }
};

// GET - Fetch all requests (No change needed here for status fetching, as it's included in the model)
export const getServiceRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.findAll({
            // Assuming your model includes the 'status' field, it will be returned automatically.
            order: [["createdAt", "DESC"]],
        });
        res.json(requests);
    } catch (error) {
        console.error("Error fetching service requests:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch requests" });
    }
};