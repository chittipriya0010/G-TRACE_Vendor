import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Car } from "lucide-react";

const issueLabels = {
    NoPower: "No Power",
    Temperature: "Temperature Issue",
    Failure: "Failure",
    Delay: "Delay",
    Others: "Others",
};

const RaiseService = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Expecting 'vehicles' array now from NotWorkingVehicle
    // vehicles is an array of objects: [{ vehicleNo: 'V1', ... }, { vehicleNo: 'V2', ... }]
    const { vehicles = [], username = "", companyName = "" } = location.state || {}; 
    
    // Extract a comma-separated list of vehicle numbers for DISPLAY ONLY
    const vehicleNosDisplay = vehicles.map(v => v.vehicleNo).join(', ');

    const [formData, setFormData] = useState({
        clientUserName: username,
        registrationNo: vehicleNosDisplay, // Kept for display, but not used directly in the submission logic below
        company: companyName,
        issue: { NoPower: false, Temperature: false, Failure: false, Delay: false, Others: false },
        otherIssueText: "",
        location: "",
        contactPerson: "",
        contactNumber: "",
        recommendedAction: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    // ... (handleChange and handleCancel remain the same) ...

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in formData.issue) {
            setFormData((prev) => ({
                ...prev,
                issue: {
                    ...prev.issue,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // 🚀 THE CRITICAL FIX IS HERE
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (vehicles.length === 0) {
            alert("No vehicles were selected for the service request. Please go back and select vehicles.");
            return;
        }

        setIsSubmitting(true);

        const problems = Object.keys(formData.issue)
            .filter((k) => formData.issue[k])
            .map((k) => (k === "Others" ? `${issueLabels[k]}: ${formData.otherIssueText}` : issueLabels[k]))
            .join(", ") || "N/A";

        // Data common to ALL service requests
        const commonData = {
            username: formData.clientUserName,
            company: formData.company,
            problem: problems,
            contactPerson: formData.contactPerson,
            contactNumber: formData.contactNumber,
            serviceLocation: formData.location, 
            date,
            recommendedAction: formData.recommendedAction,
            status: 'Raised', // Set initial status
        };

        let successCount = 0;
        let failedVehicles = [];

        // 💡 LOOP THROUGH EACH SELECTED VEHICLE AND SUBMIT A SEPARATE REQUEST
        for (const vehicle of vehicles) {
            const requestData = {
                ...commonData,
                // Assign the UNIQUE vehicleNo for THIS specific request
                vehicleNo: vehicle.vehicleNo, 
                // You might also want to include IMEI, current Lat/Long etc., from the vehicle object here
            };

            try {
                const response = await fetch("http://localhost:5000/api/service-requests", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData),
                });
                
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                successCount++;

            } catch (err) {
                console.error(`Error submitting request for ${vehicle.vehicleNo}:`, err);
                failedVehicles.push(vehicle.vehicleNo);
            }
        }

        setIsSubmitting(false);

        // Final feedback to the user
        if (failedVehicles.length === 0) {
            alert(`✅ Successfully submitted ${successCount} service request(s)!`);
        } else {
            alert(`⚠️ Submitted ${successCount} requests, but failed for the following vehicles: ${failedVehicles.join(', ')}. Check the console for details.`);
        }

        // Clean up the status persistence (if your backend handles status persistence upon fetch, this might be redundant)
        const allSubmittedVehicleNos = vehicles.map(v => v.vehicleNo);
        localStorage.setItem('lastServiceRequest', JSON.stringify({
            vehicleNos: allSubmittedVehicleNos, 
            status: 'Raised'
        }));

        // Navigate away after submission
        setTimeout(() => {
            navigate("/cce/view-jobs");
        }, 0); 
    };

    return (
        <div className="min-h-screen p-4 sm:p-10 flex justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-8 space-y-10">
                
                {/* Header - Softened Text */}
                <h2 className="text-3xl font-bold text-center text-gray-600">
                    Raise Service Request ({vehicles.length} Vehicle{vehicles.length !== 1 ? 's' : ''})
                </h2>

                {/* Centered Top Info Cards - Using softer colors (gray-100, blue-200) */}
                <div className="flex justify-center gap-6 pb-8 flex-wrap">
                    {[
                        { icon: User, label: "Client User Name", value: formData.clientUserName, iconBg: "bg-red-50", iconText: "text-red-500", color: "text-red-700" },
                        { icon: Car, label: "Vehicle Reg No.", value: formData.registrationNo, iconBg: "bg-blue-50", iconText: "text-blue-500", color: "text-blue-700" },
                    ].map(({ icon: Icon, label, value, iconBg, iconText }, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-inner w-80"
                        >
                            <div className={`p-2 ${iconBg} rounded-md flex-shrink-0`}>
                                <Icon className={`${iconText} w-5 h-5`} />
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-xs font-medium text-gray-500">
                                    {label} <span className="text-red-400">*</span>
                                </p>
                                <p className="text-sm font-semibold text-gray-700 break-words">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-gray-700"
                >
                    {/* ... (All form fields remain the same) ... */}
                    {/* Issue checkboxes (md:col-span-2) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-3">
                            Issue <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {Object.keys(formData.issue).map((key) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name={key}
                                        checked={formData.issue[key]}
                                        onChange={handleChange}
                                        className="h-4 w-4 accent-blue-400"
                                    />
                                    <span className="text-sm text-gray-700">
                                        {issueLabels[key] || key}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* If "Others" selected → text input */}
                        {formData.issue.Others && (
                            <div className="mt-3">
                                <input
                                    type="text"
                                    name="otherIssueText"
                                    value={formData.otherIssueText}
                                    onChange={handleChange}
                                    placeholder="Please specify other issue"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                                />
                            </div>
                        )}
                    </div>

                    {/* Date Picker */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Service Date <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                        />
                    </div>

                    {/* Location - TEXTAREA */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Service Location <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            rows="3"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter detailed service location (e.g., specific street, parking lot, landmark)"
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                        />
                    </div>
                    
                    {/* Contact Person */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Contact Person <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Contact Number <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                        />
                    </div>

                    {/* Recommended Action - TEXTAREA (Full Width) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-600 mb-1">
                            Recommended Action / Parts Required
                        </label>
                        <textarea
                            rows="3"
                            name="recommendedAction"
                            value={formData.recommendedAction}
                            onChange={handleChange}
                            placeholder="Specify the technician's recommended action or any necessary parts (e.g., 'Device replacement needed', 'Spare parts: 1x GPS Antenna')."
                            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-1 focus:ring-blue-300"
                        />
                    </div>

                    {/* Buttons - Duller Submit Button */}
                    <div className="md:col-span-2 flex justify-center gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting} // Disable button while submitting
                            className="px-10 py-2 bg-blue-400 text-white rounded-md font-medium hover:bg-blue-500 transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : `Submit Request${vehicles.length > 1 ? 's' : ''}`}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-10 py-2 border border-gray-300 text-gray-600 rounded-md font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RaiseService;