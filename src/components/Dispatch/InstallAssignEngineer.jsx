import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { User, Truck, MapPin } from "lucide-react"; 
import axiosInstance from "../../api/axiosInstance";

const streamOptions = [
    "bus", "dashcam", "truck", "car", "gps", "lock", "temp", "All"
];

// Map the status from the backend ('Approved') to the status used in the frontend tabs ('To Assign')
const mapBackendStatusToFrontend = (status) => {
    if (status === 'Approved') {
        return 'To Assign';
    }
    // 'Closed' usually means completed in a workflow, mapping to 'Completed' tab
    if (status === 'Closed') {
        return 'Completed';
    }
    // Assuming 'Ongoing' is consistent
    return status;
};

// --- NEW HELPER FUNCTION TO PARSE TIME STRING ---
const parseAvailableTime = (availableTimeString) => {
    if (!availableTimeString || typeof availableTimeString !== 'string') {
        return { from: 'N/A', to: 'N/A' };
    }
    
    // The format is "From: [date/time] To: [date/time]"
    const parts = availableTimeString.split(' To: ');
    const fromPart = parts[0]?.replace('From: ', '').trim();
    const toPart = parts[1]?.trim();

    return {
        from: fromPart || 'N/A',
        to: toPart || 'N/A'
    };
};

const InstallAssignEngineer = () => {
    const [activeTab, setActiveTab] = useState("To Assign");
    const [showAssignPopup, setShowAssignPopup] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // State for engineers
    const [engineers, setEngineers] = useState([]);
    const [engineerLoading, setEngineerLoading] = useState(false);

    const [selectedStreams, setSelectedStreams] = useState([]); 
    const [engineerName, setEngineerName] = useState(""); 
    const [selectedEngineerSpecialist, setSelectedEngineerSpecialist] = useState("");
    const [isThirdParty, setIsThirdParty] = useState(false);

    const headerClass = "px-4 py-3 text-center font-semibold text-gray-600 tracking-wider";
    const dataCellClass = "px-4 py-3 text-center text-gray-700 break-words";

    // --- Data Fetching Functions ---

    const fetchJobs = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axiosInstance.get("/installations");
            
            // Filter only approved/ongoing/closed installations
            const relevantJobs = response.data.filter(job => 
                ["Approved", "Ongoing", "Closed"].includes(job.status) &&
                (job.no_of_installed > 0)
            );

            const mappedJobs = relevantJobs.map((job) => {
                // ✅ IMPLEMENTED: Parse available_time into From and To parts
                const { from: availableTimeFrom, to: availableTimeTo } = parseAvailableTime(job.available_time);

                return {
                    id: job.job_id, 
                    clientName: job.client_name, 
                    clientId: job.client_id, 
                    contactPerson: job.contact_person,
                    contactNumber: job.contact_number,
                    noOfInstalled: job.no_of_installed, 
                    adminNoOfInstallations: job.admin_no_of_installations,
                    solutionType: job.installed_solution_type,
                    vehicleType: job.veh_type,
                    location: job.location,
                    // RETAINING original job.available_time for the popup, but storing parsed for table
                    availableTime: job.available_time, 
                    availableTimeFrom: availableTimeFrom, // ✅ NEW
                    availableTimeTo: availableTimeTo,   // ✅ NEW
                    status: mapBackendStatusToFrontend(job.status),
                    createdAt: job.createdAt,
                    updatedAt: job.updatedAt,
                };
            });
            setJobs(mappedJobs);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch service requests");
        } finally {
            setLoading(false);
        }
    };
    
    const fetchEngineers = async () => {
        setEngineerLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/engineers");
            setEngineers(response.data);
        } catch (err) {
            console.error("Failed to fetch engineers:", err);
            setEngineers([]); 
        } finally {
            setEngineerLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchEngineers(); 
    }, []);
// -----------------------------------------------------------
    const tabFilteredJobs = useMemo(() => {
        if (!jobs.length) return [];
        // 'To Assign' includes jobs with status 'To Assign'
        if (activeTab === 'To Assign') {
            return jobs.filter(job => job.status === 'To Assign');
        }
        // 'Ongoing' includes jobs with status 'Ongoing'
        if (activeTab === 'Ongoing') {
            return jobs.filter(job => job.status === 'Ongoing');
        }
        // 'Completed' includes jobs with status 'Completed' (which maps from 'Closed')
        if (activeTab === 'Completed') {
            return jobs.filter(job => job.status === 'Completed');
        }
        return [];
    }, [jobs, activeTab]);

    const handleAssignClick = (job) => {
        setSelectedJob(job);
        setSelectedStreams([]); 
        setEngineerName(""); 
        setSelectedEngineerSpecialist(""); 
        setShowAssignPopup(true);
        setIsThirdParty(false);
    };

    const handleEngineerSelect = (e) => {
        const selectedName = e.target.value;
        setEngineerName(selectedName);
        
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
        if (!engineerName && !isThirdParty) {
            alert("Please select an Engineer or mark as Third Party.");
            return;
        }
        if (selectedStreams.length === 0) {
            alert("Please select at least one Stream.");
            return;
        }
        
        const streamValue = selectedStreams.join(', ');

        try {
            // Your axios.put/patch call goes here to update assignment details and status to 'Ongoing'
            // const updateResponse = await axios.patch(`http://localhost:5000/api/installations/${selectedJob.id}/assign`, {
            //     assigned_engineer: engineerName,
            //     assigned_streams: streamValue,
            //     status: "Ongoing",
            //     is_third_party: isThirdParty
            // });
            
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
            <div className="flex items-center justify-between mb-4 mt-4">
                <h1 className="text-2xl font-semibold text-gray-800">Installation Requests</h1>
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

            {/* ... Loading/Error States ... */}
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
                                    <th className={headerClass}>Client Name</th> 
                                    <th className={headerClass}>Location</th>
                                    {/* ✅ ADDED: New headers for parsed time */}
                                    <th className={headerClass}>Available From</th> 
                                    <th className={headerClass}>Available To</th> 
                                    <th className={headerClass}>Contact Person</th>
                                    <th className={headerClass}>Contact Number</th>
                                    <th className={headerClass}>
                                        {activeTab === 'To Assign' ? 'Total to Assign' : 'Installed / Total'}
                                    </th> 
                                    <th className={headerClass}>Solution Type</th>
                                    <th className={headerClass}>Vehicle Type</th>
                                    <th className={headerClass}>Status</th>
                                    <th className={headerClass}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {tabFilteredJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center text-gray-500 py-6">
                                            No service requests in the "{activeTab}" tab.
                                        </td>
                                    </tr>
                                ) : (
                                    tabFilteredJobs.map((job) => (
                                        <tr
                                            key={job.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className={`${dataCellClass} font-medium`}>{job.clientName}</td>
                                            <td className={dataCellClass}>{job.location}</td>
                                            {/* ✅ IMPLEMENTED: Display parsed time */}
                                            <td className={dataCellClass}>
                                                <span className="font-semibold text-xs">{job.availableTimeFrom}</span>
                                            </td> 
                                            <td className={dataCellClass}>
                                                <span className="font-semibold text-xs">{job.availableTimeTo}</span>
                                            </td>
                                            <td className={dataCellClass}>{job.contactPerson}</td>
                                            <td className={dataCellClass}>{job.contactNumber}</td>
                                            
                                            <td className={dataCellClass + (activeTab !== 'To Assign' ? ' font-bold' : '')}>
                                                {activeTab === 'To Assign' ? (
                                                    // Show the total number approved by Admin
                                                    job.noOfInstalled || "N/A"
                                                ) : (
                                                    // Show CCE's count / Admin's total
                                                    `${job.noOfInstalled || 0} / ${job.adminNoOfInstallations || 0}`
                                                )}
                                            </td> 
                                            
                                            <td className={dataCellClass}>{job.solutionType}</td>
                                            <td className={dataCellClass}>{job.vehicleType}</td>
                                            <td className={dataCellClass}>{job.status}</td>
                                            <td className={dataCellClass}>
                                                {activeTab === "To Assign" && (
                                                    <button
                                                        onClick={() => handleAssignClick(job)}
                                                        className="px-2 py-1 bg-blue-600 text-white rounded-md shadow-sm text-xs font-medium hover:bg-blue-700 transition-colors"
                                                    >
                                                        Assign Engineer
                                                    </button>
                                                )}
                                                {activeTab !== "To Assign" && (
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">
                                                        {activeTab === 'Ongoing' ? `Assigned to ${job.engineer || 'N/A'}` : 'Closed'}
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
                                <span className="truncate">{selectedJob.clientName}</span> 
                            </p>
                            <p className="flex items-center text-gray-700">
                                <Truck size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold mr-1">Installations:</span> 
                                {selectedJob.noOfInstalled} 
                            </p>
                            <p className="flex items-center text-gray-700">
                                <MapPin size={16} className="text-orange-500 mr-2 flex-shrink-0" />
                                <span className="font-semibold mr-1">Location:</span> 
                                {selectedJob.location}
                            </p>
                             {/* Displaying the full available time string for context in the popup */}
                            <p className="flex items-start text-gray-700">
                                <span className="font-semibold mr-1">Time:</span> 
                                {selectedJob.availableTime || 'N/A'}
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
                            
                            {/* Engineer Name Select Dropdown */}
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
                                        required={!isThirdParty} 
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
                            
                            {/* Engineer Specialist Info */}
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
                                    disabled={selectedStreams.length === 0 || (!isThirdParty && !engineerName)} 
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

export default InstallAssignEngineer;