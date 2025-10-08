import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { User, Truck, MapPin } from "lucide-react"; 

const streamOptions = [
    "bus", "dashcam", "truck", "car", "gps", "lock", "temp", "All"
];

// Map the status from the backend ('Raised') to the status used in the frontend tabs ('To Assign')
const mapBackendStatusToFrontend = (status) => {
    if (status === 'Raised') {
        return 'To Assign';
    }
    // Assume Ongoing and Completed are consistent
    return status;
};

const ServiceAssignEngineer = () => {
    const [activeTab, setActiveTab] = useState("To Assign");
    const [showAssignPopup, setShowAssignPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // 💥 NEW STATE: To hold the list of engineers fetched from the API
    const [engineers, setEngineers] = useState([]);
    const [engineerLoading, setEngineerLoading] = useState(false);

    const [selectedStreams, setSelectedStreams] = useState([]); 
    // engineerName now holds the selected engineer_name from the dropdown
    const [engineerName, setEngineerName] = useState(""); 
    // 💥 NEW STATE: To show the stream info in the dropdown
    const [selectedEngineerSpecialist, setSelectedEngineerSpecialist] = useState("");
    const [isThirdParty, setIsThirdParty] = useState(false);

    const headerClass = "px-4 py-3 text-center font-semibold text-gray-600 tracking-wider";
    const dataCellClass = "px-4 py-3 text-center text-gray-700 break-words";

    // --- Data Fetching Functions ---

    const fetchJobs = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:5000/api/service-requests");
            const mappedJobs = response.data.map((job) => ({
                id: job.id,
                username: job.username,
                vehicleNo: job.vehicleNo,
                serviceLocation: job.serviceLocation,
                contactPerson: job.contactPerson,
                contactNumber: job.contactNumber,
                recommendedAction: job.recommendedAction || "N/A",
                status: mapBackendStatusToFrontend(job.status || "To Assign"), 
                engineer: job.engineer, 
                stream: job.stream, 
            }));
            setJobs(mappedJobs);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch service requests");
        } finally {
            setLoading(false);
        }
    };
    
    // 💥 NEW FUNCTION: Fetch the list of installers/engineers
    const fetchEngineers = async () => {
        setEngineerLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/engineers");
            setEngineers(response.data);
        } catch (err) {
            console.error("Failed to fetch engineers:", err);
            // Optional: Set a user-facing error for engineers
        } finally {
            setEngineerLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // 💥 Call the new fetch function when the component mounts
        fetchEngineers(); 
    }, []);
// -----------------------------------------------------------
    const tabFilteredJobs = useMemo(() => {
        if (!jobs.length) return [];
        return jobs.filter(job => job.status === activeTab);
    }, [jobs, activeTab]);

    const handleAssignClick = (job) => {
        setSelectedJob(job);
        setSelectedStreams([]); 
        // 💥 Set name to empty string, not null
        setEngineerName(""); 
        setSelectedEngineerSpecialist(""); 
        setShowAssignPopup(true);
        setIsThirdParty(false);
    };

    // 💥 NEW HANDLER: Select Engineer from Dropdown
    const handleEngineerSelect = (e) => {
        const selectedName = e.target.value;
        setEngineerName(selectedName);
        
        // Find the full engineer object to get the specialist field
        const engineer = engineers.find(eng => eng.engineer_name === selectedName);
        setSelectedEngineerSpecialist(engineer ? engineer.stream : "");
    };

    const handleStreamChange = (option, checked) => {
        setSelectedStreams(prevStreams => {
            if (checked) {
                return [...prevStreams, option];
            } else {
                return prevStreams.filter(stream => stream !== option);
            }
        });
    };

     const handleThirdPartyChange = (e) => {
        setIsThirdParty(e.target.checked);
    };

    const handleAssignSubmit = async () => {
        if (!engineerName) {
            alert("Please select an Engineer.");
            return;
        }
        if (selectedStreams.length === 0) {
            alert("Please select at least one Stream.");
            return;
        }
        
        const streamValue = selectedStreams.join(', ');

        // 💥 TEMPORARY LOGIC (REPLACE WITH AXIOS CALL)
        console.log("Assignment Submitted:", {
            jobId: selectedJob.id,
            engineer: engineerName,
            stream: streamValue,
            status: "Ongoing",
            isThirdParty: isThirdParty 
        });
        
        try {
            // ... (Your axios.put/patch call goes here)
            
            setJobs(prevJobs => prevJobs.map(job => 
                job.id === selectedJob.id ? { ...job, 
                    status: "Ongoing",
                    engineer: engineerName, 
                    stream: streamValue 
                } : job
            ));
        } catch (error) {
            console.error("Error submitting assignment:", error);
            alert("Failed to assign engineer. Please try again.");
            return;
        }
        
        setShowAssignPopup(false);
    };
// -----------------------------------------------------------
    return (
        <div className="h-screen p-4">
            {/* ... (Existing Tabs and Table rendering) ... */}
            <div className="flex items-center justify-between mb-4 mt-4">
                <h1 className="text-2xl font-semibold text-gray-800">Service Requests</h1>
                <div className="flex space-x-2">
                    {["To Assign", "Ongoing", "Completed"].map((tab) => (
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
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-gray-200">
                                    <th className={headerClass}>Username</th>
                                    <th className={headerClass}>Vehicle No</th>
                                    <th className={headerClass}>Service Location</th>
                                    <th className={headerClass}>Contact Person</th>
                                    <th className={headerClass}>Contact Number</th>
                                    <th className={headerClass}>Recommended Action</th>
                                    <th className={headerClass}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {tabFilteredJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-gray-500 py-6">
                                            No service requests in the "{activeTab}" tab.
                                        </td>
                                    </tr>
                                ) : (
                                    tabFilteredJobs.map((job) => (
                                        <tr
                                            key={job.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className={`${dataCellClass} font-medium`}>{job.username}</td>
                                            <td className={dataCellClass}>{job.vehicleNo}</td>
                                            <td className={dataCellClass}>{job.serviceLocation}</td>
                                            <td className={dataCellClass}>{job.contactPerson}</td>
                                            <td className={dataCellClass}>{job.contactNumber}</td>
                                            <td className={dataCellClass}>{job.recommendedAction}</td>
                                            <td className={dataCellClass}>
                                                {activeTab === "To Assign" && (
                                                    <button
                                                        onClick={() => handleAssignClick(job)}
                                                        className="px-2 py-1 bg-blue-600 text-white rounded-md shadow-sm text-xs font-medium hover:bg-blue-700 transition-colors"
                                                    >
                                                        Assign Engineer
                                                    </button>
                                                )}
                                                {activeTab === "Ongoing" && (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">
                                                        Assigned to {job.engineer || 'N/A'} ({job.stream || 'N/A'})
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Enhanced Assign Engineer Popup */}
            {showAssignPopup && selectedJob && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-30">
                    <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">Assign Engineer to Job</h2>

                        {/* Job Details Card (UX Improvement) */}
                        <div className="mb-6 space-y-2 text-sm">
                            <p className="flex items-center text-gray-700">
                                <User size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold mr-1">Client:</span> 
                                <span className="truncate">{selectedJob.username}</span>
                            </p>
                            <p className="flex items-center text-gray-700">
                                <Truck size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold mr-1">Vehicle:</span> 
                                {selectedJob.vehicleNo}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold mr-1">Location:</span> 
                                {selectedJob.serviceLocation}
                            </p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleAssignSubmit(); }} className="space-y-4">

                            <div className="flex items-center">
                                <input
                                    id="isThirdParty"
                                    type="checkbox"
                                    checked={isThirdParty}
                                    onChange={handleThirdPartyChange}
                                    className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <label htmlFor="isThirdParty" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                                    Third Party Assignment
                                </label>
                            </div>
                            
                            {/* 💥 MODIFIED: Engineer Name Select Dropdown */}
                            <div>
                                <label htmlFor="engineerName" className="block mb-2 text-sm font-medium text-gray-700">
                                    Select Engineer 
                                    <span className="text-red-500">*</span>
                                </label>
                                {engineerLoading ? (
                                    <p className="text-sm text-gray-500">Loading engineers...</p>
                                ) : (
                                    <select
                                        id="engineerName"
                                        value={engineerName}
                                        onChange={handleEngineerSelect}
                                        required
                                        disabled={isThirdParty}
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="" disabled>
                                            {isThirdParty ? 'Third Party will be assigned' : 'Select an Engineer'}
                                        </option>
                                        {engineers.map((engineer, index) => (
                                            <option 
                                                key={index} 
                                                value={engineer.engineer_name}
                                            >
                                                {engineer.engineer_name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            
                            {/* 💥 NEW DISPLAY: Engineer Specialist Info */}
                            {selectedEngineerSpecialist && !isThirdParty && (
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">
                                    <span className="font-semibold">Specialist in:</span> {selectedEngineerSpecialist || 'N/A'}
                                </div>
                            )}

                            {/* Select Stream - MODIFIED TO CHECKBOXES */}
                            <div>
                                <span className="block mb-2 text-sm font-medium text-gray-700">
                                    Select Stream(s) <span className="text-red-500">*</span>
                                </span>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {streamOptions.map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="stream"
                                                value={option}
                                                checked={selectedStreams.includes(option)} 
                                                onChange={(e) => handleStreamChange(option, e.target.checked)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAssignPopup(false)}
                                    className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    // If it's a third-party job, only streams are required. Otherwise, engineer name AND streams are required.
                                    disabled={(!isThirdParty && !engineerName) || selectedStreams.length === 0} 
                                    className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                                >
                                    Assign
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceAssignEngineer;