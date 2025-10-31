import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async"; 

// Assuming GTRACLoader is available
import GTRACLoader from "../../GtracLoader"; 

// --- Local Storage & Utility Constants ---
const CLIENT_STORAGE_KEY = "selectedClient_NWV"; 
const VEHICLE_DATA_KEY = "vehicleData_NWV";
const SEEN_STATUS_KEY = "clientSeenStatus_NWV";

// Helper function to safely parse JSON from localStorage 
const getInitialState = (key, defaultValue) => {
    try {
        const storedValue = localStorage.getItem(key);
        
        if (key === SEEN_STATUS_KEY) {
            const data = storedValue ? JSON.parse(storedValue) : {};
            const today = new Date().toISOString().split("T")[0];
            if (data.date === today) {
                return data.seenClients || {};
            }
            return {}; 
        }
        
        if (key === CLIENT_STORAGE_KEY) {
            const parsedValue = storedValue ? JSON.parse(storedValue) : defaultValue;
            if (parsedValue && !Array.isArray(parsedValue)) {
                return [parsedValue];
            }
            return parsedValue || [];
        }
        
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error("Error reading localStorage key:", key, error);
        return defaultValue;
    }
};

const formatLatLong = (latLongString, precision = 4) => {
    if (!latLongString || typeof latLongString !== 'string') return 'N/A';
    const parts = latLongString.split(',');
    if (parts.length !== 2) return latLongString;

    try {
        const lat = parseFloat(parts[0].trim()).toFixed(precision);
        const long = parseFloat(parts[1].trim()).toFixed(precision);
        return `${lat}, ${long}`;
    } catch (e) {
        console.error("Failed to parse coordinates:", latLongString, e);
        return latLongString;
    }
};

const formatNotWorkingDaysDisplay = (value) => {
    if (typeof value === 'string' && value.includes('day')) {
        return value;
    }
    const floatValue = parseFloat(value);
    if (isNaN(floatValue) || floatValue <= 0) {
        return "0 hrs";
    }

    const totalHours = floatValue * 24;
    const days = Math.floor(totalHours / 24);
    const remainingHours = Math.round(totalHours % 24);
    
    let result = [];
    if (days > 0) {
        result.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (remainingHours > 0) {
        result.push(`${remainingHours} hr${remainingHours > 1 ? 's' : ''}`);
    }
    
    return result.length > 0 ? result.join(' ') : "0 hrs";
};

// ====================================================================
// CUSTOM OPTION COMPONENT (Checkbox-only selection logic)
// ====================================================================

const ClientOption = (props) => {
  const { innerProps, innerRef, isSelected, data, selectOption, clientSeenStatus } = props;
  const isSeen = !!clientSeenStatus[data.value];

  const handleSelection = (e) => {
    console.log("handleSelection triggered for:", data.label);
    e.preventDefault();
    e.stopPropagation();
    selectOption(data);
  };

  return (
    <div
      ref={innerRef}
      {...innerProps}
      onMouseDown={handleSelection}
      className={`flex items-center justify-between p-2 cursor-pointer ${
        isSelected ? "bg-blue-100" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-2 flex-grow min-w-0">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="h-4 w-4 accent-blue-600"
          onClick={(e) => e.stopPropagation()} // Prevent checkbox click from bubbling
        />
        <span className="text-sm truncate">{data.label}</span>
      </div>
      {isSeen && (
        <span className="flex-shrink-0 text-xs font-bold text-green-600 ml-4">
          ✓ Seen
        </span>
      )}
    </div>
  );
};


// --- Main Component (NotWorkingVehicle) ---

const NotWorkingVehicle = () => {
    const [selectedClients, setSelectedClients] = useState(() => 
        getInitialState(CLIENT_STORAGE_KEY, [])
    );
    const [vehicleData, setVehicleData] = useState(() =>
        getInitialState(VEHICLE_DATA_KEY, [])
    );
    const [clientSeenStatus, setClientSeenStatus] = useState(() => 
        getInitialState(SEEN_STATUS_KEY, {})
    );
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState("Not Working Vehicles");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const selectComponents = useMemo(() => ({
        Option: (props) => <ClientOption {...props} clientSeenStatus={clientSeenStatus} />,
    }), [clientSeenStatus]);


    // --- Data Handlers ---

    const loadOptions = useCallback(async (inputValue) => {
        try {
            const res = await fetch(`https://gtracerp-backend.onrender.com/api/addClients?search=${inputValue}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            
            const options = data.map((c) => ({
                value: c.Userid,
                label: `${c.UserName} (${c.company || "No Company"})`,
                company: c.company, 
            }));

            return options;
        } catch (err) {
            console.error("Error fetching clients for search:", err);
            return []; 
        }
    }, []);

    const handleClientChange = (newClients) => {
        // Clear vehicle data if selection is cleared
        if (!newClients || newClients.length === 0) {
            setVehicleData([]);
            localStorage.removeItem(VEHICLE_DATA_KEY);
            setCurrentPage(1);
            setSelectedVehicles([]);
        }
        // Update the array of selected clients
        setSelectedClients(newClients || []);
    };

    const handleSubmit = async () => {
        if (selectedClients.length === 0) return;

        setIsLoading(true);
        setVehicleData([]); 
        localStorage.removeItem(VEHICLE_DATA_KEY);
        setCurrentPage(1);
        setSelectedVehicles([]);
        
        // Mark *all* selected clients as seen for the day on submission
        setClientSeenStatus(prev => {
            const updates = selectedClients.reduce((acc, client) => {
                acc[client.value] = true;
                return acc;
            }, {});
            return { ...prev, ...updates };
        });

        // Prepare comma-separated list of client IDs for API call
        const clientIds = selectedClients.map(c => c.value).join(',');
        
        try {
            const res = await fetch(
                `https://gtracerp-backend.onrender.com/api/vehicles/not-working?clientId=${clientIds}`
            );
            const json = await res.json();

            if (json.success && Array.isArray(json.vehicles)) {
                setVehicleData(json.vehicles);
            } else {
                setVehicleData([]);
            }
        } catch (err) {
            console.error("Error fetching vehicles:", err);
            setVehicleData([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // ... (rest of the component logic for pagination, service requests, etc.)

    const currentVehicles = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return vehicleData.slice(startIndex, endIndex);
    }, [vehicleData, currentPage, itemsPerPage]);

    const totalPages = useMemo(() => {
        return Math.ceil(vehicleData.length / itemsPerPage);
    }, [vehicleData.length, itemsPerPage]);

    useEffect(() => {
        if (selectedClients.length > 0) {
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(selectedClients));
        } else {
            localStorage.removeItem(CLIENT_STORAGE_KEY);
            localStorage.removeItem(VEHICLE_DATA_KEY);
            setVehicleData([]);
        }
    }, [selectedClients]);

    useEffect(() => {
        if (vehicleData.length > 0) {
            localStorage.setItem(VEHICLE_DATA_KEY, JSON.stringify(vehicleData));
        } else {
            if(selectedClients.length === 0) {
               localStorage.removeItem(VEHICLE_DATA_KEY);
            }
        }
    }, [vehicleData, selectedClients]);
    
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(SEEN_STATUS_KEY, JSON.stringify({
            date: today,
            seenClients: clientSeenStatus,
        }));
    }, [clientSeenStatus]);

    useEffect(() => {
        setCurrentPage(1);
        setSelectedVehicles([]); 
    }, [vehicleData]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleVehicleSelection = (vehicleNo) => {
        setSelectedVehicles(prev => 
            prev.includes(vehicleNo)
                ? prev.filter(v => v !== vehicleNo)
                : [...prev, vehicleNo]
        );
    };

    const getSelectedVehicleObjects = () => vehicleData.filter(v => selectedVehicles.includes(v.vehicleNo));

    const getServiceClientInfo = (clientArray) => {
        if (clientArray.length === 0) return { username: 'N/A', companyName: 'N/A' };
        const client = clientArray[0];
        return { 
            username: client.label, 
            companyName: client.company 
        };
    }

    const handleBulkAddService = () => {
        const selectedVehicleObjects = getSelectedVehicleObjects();
        if (selectedVehicleObjects.length === 0) return;
        
        const clientInfo = getServiceClientInfo(selectedClients);

        navigate("/cce/raise-service", {
            state: { 
                vehicles: selectedVehicleObjects,
                ...clientInfo
            },
        });
    };

    const handleSingleAddService = (vehicle) => {
        const clientInfo = getServiceClientInfo(selectedClients);

        navigate("/cce/raise-service", {
            state: { 
                vehicles: [vehicle], 
                ...clientInfo
            },
        });
    };


    // --- Render Component ---

    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Not Working Vehicle</h1>
                <div className="rounded-lg flex space-x-2">
                    {["All Services", "Not Working Vehicles", "Service", "Device Removed"].map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    activeTab === tab
                                        ? "bg-orange-500 text-white shadow-sm"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                                }`}
                            >
                                {tab}
                            </button>
                        )
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-semibold text-gray-700">Client Name(s)</label>
                        <div className="w-72">
                            <AsyncSelect
                                cacheOptions 
                                loadOptions={loadOptions}
                                value={selectedClients}
                                isMulti
                                onChange={handleClientChange} 
                                placeholder="Type to search clients..."
                                isClearable
                                components={selectComponents} 
                                closeMenuOnSelect={false} // 👈 THIS IS THE CRITICAL FIX
                                hideSelectedOptions={false}
                                blurInputOnSelect={false}
                                menuShouldBlockScroll={true}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={selectedClients.length === 0 || isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit
                        </button>
                    </div>
                    
                    {selectedVehicles.length > 0 && (
                        <button
                            onClick={handleBulkAddService}
                            className="px-4 py-2 text-sm rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                        >
                            Raise Request for {selectedVehicles.length} Vehicle(s)
                        </button>
                    )}
                </div>
                
                {/* Table Section */}
                <div className="bg-white rounded-lg overflow-hidden border-gray-200">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <GTRACLoader />
                        ) : (
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-gray-400">
                                        <th className="w-10 px-1 py-4 text-center font-semibold text-gray-400">
                                            <input type="checkbox" disabled={vehicleData.length === 0}
                                                checked={selectedVehicles.length === vehicleData.length && vehicleData.length > 0}
                                                onChange={() => {
                                                    setSelectedVehicles(selectedVehicles.length === vehicleData.length 
                                                        ? [] 
                                                        : vehicleData.map(v => v.vehicleNo));
                                                }}
                                                className="h-4 w-4 accent-blue-600"
                                            />
                                        </th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Vehicle Reg No.</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">IMEI</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Last Service Date</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Last Contact Time</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Notworking Days</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Status</th> 
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Lat Long</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Temperature</th>
                                        <th className="px-1 py-4 text-center font-semibold text-gray-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {currentVehicles.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="text-center text-gray-500 py-6">
                                                {selectedClients.length > 0 && vehicleData.length > 0
                                                    ? "No vehicles found on this page." 
                                                    : selectedClients.length > 0 
                                                    ? "No vehicles found for the selected client(s)." 
                                                    : "No vehicles found. Select client(s) and click Submit."}
                                            </td>
                                        </tr>
                                    ) : (
                                        currentVehicles.map((row, idx) => (
                                            <tr
                                                key={idx}
                                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-1 py-4 text-center">
                                                    <input type="checkbox"
                                                        checked={selectedVehicles.includes(row.vehicleNo)}
                                                        onChange={() => toggleVehicleSelection(row.vehicleNo)}
                                                        className="h-4 w-4 accent-blue-600"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-center text-gray-800 font-medium">{row.vehicleNo}</td>
                                                <td className="px-2 py-4 text-center text-gray-700">{row.imei}</td>
                                                <td className="px-2 py-4 text-center text-gray-700">{row.lastServiceDate}</td>
                                                <td className="px-2 py-4 text-center text-gray-700">{row.lastContactTime}</td>
                                                <td className="px-2 py-4 text-center text-gray-700">
                                                    {formatNotWorkingDaysDisplay(row.networkingDays)}
                                                </td>
                                                <td className="px-2 py-4 text-center">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        row.requestStatus === 'Raised' ? 'bg-red-100 text-red-700' : 
                                                        row.requestStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {row.requestStatus === 'None' ? 'New Issue' : row.requestStatus}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-4 text-center text-blue-600 font-medium hover:underline cursor-pointer">
                                                    {formatLatLong(row.latLong)}
                                                </td>
                                                <td className="px-2 py-4 text-gray-700">{row.temp}°</td>
                                                <td className="px-2 py-4">
                                                    <button
                                                        onClick={() => handleSingleAddService(row)}
                                                        disabled={selectedVehicles.length > 0} 
                                                        className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:bg-gray-400"
                                                    >
                                                        Raise a Request
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Pagination Controls */}
                {vehicleData.length > itemsPerPage && (
                    <div className="flex justify-between items-center mt-4 p-2">
                        <p className="text-sm text-gray-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, vehicleData.length)} of {vehicleData.length} vehicles
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </button>

                            <span className="px-3 py-1 text-sm font-semibold rounded-md bg-blue-600 text-white">
                                {currentPage}
                            </span>
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm font-medium rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotWorkingVehicle;