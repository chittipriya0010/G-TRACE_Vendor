import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { DollarSign, MapPin, Phone, User, Clock, X, ChevronDown, ChevronRight, Truck } from "lucide-react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; 
let socket;

// Helper component for styled form fields
const FormField = ({ label, children, isRequired }) => (
    <div className={`space-y-1 ${isRequired ? 'border-l-2 border-orange-200 pl-4' : ''}`}>
        <label className="text-sm font-semibold text-gray-600 block">
            {label}
            {isRequired && <span className="text-red-400 ml-1">*</span>}
        </label>
        {children}
    </div>
);

const ViewInstallationRequest = () => {
    const [activeTab, setActiveTab] = useState('requests');
    const [requests, setRequests] = useState([]);
    const [allInstallations, setAllInstallations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedReq, setSelectedReq] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [form, setForm] = useState({
        installed_solution_type: "",
        no_of_installations: "",
        contact_person: "",
        contact_number: "",
        location: "",
        available_from_date: "",
        available_from_time: "",
        available_to_date: "",
        available_to_time: "",
        date_preset: "",
        selected_vehicles: []
    });

    const navigate = useNavigate();

    const distributeInstallations = (totalUnits, selectedVehicles) => {
        const result = {};
        const numTypes = selectedVehicles.length;

        if (numTypes === 0) return {};

        const baseUnits = Math.floor(totalUnits / numTypes);
        let remainder = totalUnits % numTypes;

        for (let i = 0; i < numTypes; i++) {
            let units = baseUnits;
            
            if (remainder > 0) {
                units += 1;
                remainder -= 1;
            }
            
            if (units > 0) {
                result[selectedVehicles[i]] = units;
            }
        }
        return result;
    };

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            const [packagesRes, installationsRes, vehiclesRes] = await Promise.all([
                axiosInstance.get("/packages"),
                axiosInstance.get("/installations"),
                axiosInstance.get("/vehicles"),
            ]);

            setVehicleTypes(vehiclesRes.data || []);

            const userDataString = localStorage.getItem("user") || sessionStorage.getItem("user");
            
            if (!userDataString) {
                throw new Error("User data is missing, please log in again.");
            }

            const user = JSON.parse(userDataString);
            const userTeamId = user.teamId || user.team_id; 

            console.log("DEBUG: Retrieved User Data:", user);
            console.log("DEBUG: User Team ID being used for filtering:", userTeamId);

            setAllInstallations(installationsRes.data || []);

            const rawPackages = packagesRes.data.packages || packagesRes.data;
            console.log("DEBUG: Total packages received from API:", rawPackages.length);

            const statusFilteredPackages = rawPackages.filter(
                (pkg) => pkg.status === "Billed"
            );
            console.log("DEBUG: Packages filtered by status 'Billed':", statusFilteredPackages.length);

            const filteredPackages = statusFilteredPackages.filter(
                (pkg) => String(pkg.teamId) === String(userTeamId)
            );
            
            console.log("DEBUG: Final packages after filtering by teamId:", filteredPackages.length);

            const installMap = installationsRes.data.reduce((acc, inst) => {
                const key = `${inst.client_id}_${inst.installed_solution_type}`;

                if (!acc[key]) {
                    acc[key] = {
                        latestRecord: null,
                        allRecords: [],
                    };
                }

                acc[key].allRecords.push(inst);

                if (inst.status !== 'Rejected') {
                    if (!acc[key].latestRecord ||
                        inst.job_id > acc[key].latestRecord.job_id) {
                        acc[key].latestRecord = inst;
                    }
                }

                return acc;
            }, {});

            const expandedRequests = [];

            filteredPackages.forEach((pkg) => {
                const solutionTypes = pkg.solutionType?.split(",").map(s => s.trim()) || [];

                solutionTypes.forEach(solutionType => {
                    const key = `${pkg.clientId}_${solutionType}`;
                    const clientData = installMap[key];
                    const latestInst = clientData ? clientData.latestRecord : null;

                    let installationStatus = "Not Assigned";
                    let adminApprovedCount = null;
                    let totalInstalled = 0;
                    let installationRecords = [];

                    if (clientData) {
                        installationRecords = clientData.allRecords
                            .filter(r => r.status === 'Approved')
                            .filter(r => r.no_of_installed && r.no_of_installed > 0);
                        totalInstalled = installationRecords.reduce((sum, r) => sum + (r.no_of_installed || 0), 0);
                    }

                    if (latestInst) {
                        installationStatus = latestInst.status;
                        adminApprovedCount = latestInst.admin_no_of_installations;
                    }

                    expandedRequests.push({
                        ...pkg,
                        id: `${pkg.id}_${solutionType}`,
                        solutionType: solutionType,
                        packageStatus: pkg.status,
                        installationStatus: installationStatus,
                        latestInstallation: latestInst,
                        adminApprovedCount: adminApprovedCount,
                        totalInstalled: totalInstalled,
                        installationRecords: installationRecords,
                        remainingToInstall: adminApprovedCount ? Math.max(adminApprovedCount - totalInstalled, 0) : null,
                    });
                });
            });

            setRequests(expandedRequests);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            setError(`Failed to fetch installation data: ${err.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        socket = io(SOCKET_SERVER_URL);
        socket.on('installationStatusUpdated', (update) => {
            console.log('Socket: installationStatusUpdated received.', update);
            fetchData();
        })
        fetchData();

        return () => {
            console.log('Disconnecting socket...');
            socket.disconnect();
        };
    }, []);

    const toggleRowExpansion = (rowId) => {
        setExpandedRows(prev => ({
            ...prev,
            [rowId]: !prev[rowId]
        }));
    };

    const openPopup = (req) => {
        setSelectedReq(req);

        const isApproved = req.installationStatus === "Approved";

        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().slice(0, 5);

        setForm({
            installed_solution_type: "",
            no_of_installations: isApproved ? (req.remainingToInstall || "") : "",
            contact_person: "",
            contact_number: "",
            location: "",
            available_from_date: currentDate,
            available_from_time: currentTime,
            available_to_date: currentDate,
            available_to_time: currentTime,
            date_preset: "",
            selected_vehicles: [],
        });
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleDatePresetChange = (preset) => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        
        let targetDate;
        if (preset === "today") {
            targetDate = now.toISOString().split('T')[0];
        } else if (preset === "tomorrow") {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            targetDate = tomorrow.toISOString().split('T')[0];
        }

        setForm(prev => ({
            ...prev,
            date_preset: prev.date_preset === preset ? "" : preset,
            available_from_date: targetDate,
            available_to_date: targetDate,
            available_from_time: currentTime,
            available_to_time: currentTime,
        }));
    };

    const handleVehicleChange = (vehicleId, isChecked) => {
        setForm(prev => {
            const currentVehicles = prev.selected_vehicles;
            const newVehicles = isChecked
                ? [...currentVehicles, vehicleId]
                : currentVehicles.filter(id => id !== vehicleId);

            return { ...prev, selected_vehicles: newVehicles };
        });
    };

    const handleSubmit = async () => {
        const isApprovedStatus = selectedReq.installationStatus === "Approved";

        try {
            if (!isApprovedStatus) {
                if (!form.no_of_installations || form.no_of_installations <= 0) {
                    alert("Please enter a valid number of installations.");
                    return;
                }

                const newPayload = {
                    client_id: selectedReq.clientId,
                    client_name: selectedReq.clientFullName || selectedReq.userName,
                    installed_solution_type: selectedReq.solutionType,
                    no_of_installations: parseInt(form.no_of_installations, 10),
                    status: "Pending",
                    admin_no_of_installations: null,
                    no_of_installed: 0,
                };

                await axiosInstance.post("/installations", newPayload);
                alert("Installation request submitted successfully! Waiting for admin approval.");
            } else {
                if (!form.no_of_installations ||
                    form.no_of_installations <= 0 ||
                    !form.location ||
                    !form.available_from_date ||
                    !form.available_from_time ||
                    !form.available_to_date ||
                    !form.available_to_time ||
                    !form.contact_person ||
                    !form.contact_number ||
                    form.selected_vehicles.length === 0) {
                    alert("Please fill all required fields including location, date, time, contact person, and contact number.");
                    return;
                }

                const installationsToReport = parseInt(form.no_of_installations, 10);

                if (installationsToReport > selectedReq.remainingToInstall) {
                    alert(`You can only report a maximum of ${selectedReq.remainingToInstall} unit(s) for installation.`);
                    return;
                }

                const formatToIST = (dateString, timeString) => {
                    if (!dateString || !timeString) return '';
                    const dateTimeString = `${dateString}T${timeString}`;
                    const date = new Date(dateTimeString);
                    return date.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                };

                const formattedFrom = formatToIST(form.available_from_date, form.available_from_time);
                const formattedTo = formatToIST(form.available_to_date, form.available_to_time);

                const selectedVehicleNames = vehicleTypes
                    .filter(v => form.selected_vehicles.includes(v.id))
                    .map(v => v.veh_type);

                const distributedUnits = distributeInstallations(
                    installationsToReport,
                    selectedVehicleNames
                );

                const requests = [];

                for (const [vehicleName, units] of Object.entries(distributedUnits)) {
                    const installationPayload = {
                        client_id: selectedReq.clientId,
                        client_name: selectedReq.clientFullName || selectedReq.userName,
                        installed_solution_type: selectedReq.solutionType,
                        no_of_installations: selectedReq.adminApprovedCount,
                        admin_no_of_installations: selectedReq.adminApprovedCount,
                        no_of_installed: units,
                        contact_person: form.contact_person,
                        contact_number: form.contact_number,
                        location: form.location,
                        veh_type: vehicleName,
                        available_time: `From: ${formattedFrom} To: ${formattedTo}`,
                        status: "Approved",
                    };

                    requests.push(axiosInstance.post("/installations", installationPayload));
                }

                await Promise.all(requests);

                alert(`Installation of ${installationsToReport} unit(s) raised successfully across ${Object.keys(distributedUnits).length} vehicle type(s)!`);
            }

            setSelectedReq(null);
            fetchData();
        } catch (err) {
            console.error("Failed to process installation request:", err);
            alert("Failed to submit request.");
        }
    };

    const filteredRequests = requests.filter(
        (r) =>
            (r.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (r.clientFullName || r.userName || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const RequestTable = () => (
        <div className="bg-white shadow rounded-xl border border-gray-200 overflow-x-auto mt-4">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-3 py-3 text-left w-8"></th>
                        <th className="px-3 py-3 text-left">Company</th>
                        <th className="px-3 py-3 text-left">Client</th>
                        <th className="px-3 py-3 text-left">Solution(s) Purchased</th>
                        <th className="px-3 py-3 text-center">Admin Approved</th>
                        <th className="px-3 py-3 text-center">Total Installed</th>
                        <th className="px-3 py-3 text-center">Remaining</th>
                        <th className="px-3 py-3 text-left">Status</th>
                        <th className="px-3 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRequests.map((req) => {
                        const status = req.installationStatus;
                        const isExpanded = expandedRows[req.id];
                        const hasInstallations = req.installationRecords && req.installationRecords.length > 0;

                        let buttonText = "Request Installation";
                        let isDisabled = false;

                        if (status === "Pending") {
                            buttonText = "Pending Review";
                            isDisabled = true;
                        } else if (status === "Approved") {
                            if (req.remainingToInstall > 0) {
                                buttonText = "Raise Installation";
                            } else {
                                buttonText = "Completed";
                                isDisabled = true;
                            }
                        } else if (status === "Rejected") {
                            buttonText = "Request Installation";
                        }

                        return (
                            <React.Fragment key={req.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-3 py-3">
                                        {hasInstallations && (
                                            <button
                                                onClick={() => toggleRowExpansion(req.id)}
                                                className="text-gray-600 hover:text-gray-800 transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown size={20} />
                                                ) : (
                                                    <ChevronRight size={20} />
                                                )}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-3 py-3">{req.companyName}</td>
                                    <td className="px-3 py-3">
                                        {req.clientFullName || req.userName}
                                    </td>
                                    <td className="px-3 py-3">{req.solutionType}</td>

                                    <td className="px-3 py-3 text-center font-semibold text-green-700">
                                        {req.adminApprovedCount !== null ? req.adminApprovedCount : '-'}
                                    </td>

                                    <td className="px-3 py-3 text-center font-semibold text-blue-600">
                                        {status === "Approved" ? req.totalInstalled : '-'}
                                    </td>

                                    <td className="px-3 py-3 text-center font-semibold text-orange-600">
                                        {req.remainingToInstall !== null ? req.remainingToInstall : '-'}
                                    </td>

                                    <td className="px-3 py-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeStyle(status)}`}>
                                            {status}
                                        </span>
                                    </td>

                                    <td className="px-3 py-3 text-center">
                                        {status === "Pending" ? (
                                            <span className="text-sm text-gray-500 italic">Review in progress...</span>
                                        ) : (
                                            <button
                                                className={`px-3 py-1 rounded-full text-white ${isDisabled
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-orange-500 hover:bg-orange-600 transition-colors shadow-md"
                                                    }`}
                                                onClick={() => openPopup(req)}
                                                disabled={isDisabled}
                                            >
                                                {buttonText}
                                            </button>
                                        )}
                                    </td>
                                </tr>

                                {isExpanded && hasInstallations && (
                                    <tr>
                                        <td colSpan="9" className="px-3 py-0">
                                            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-3 rounded-md shadow-md">
                                                <h4 className="text-base font-semibold text-gray-800 mb-5">
                                                    Installation Records ({req.installationRecords.length})
                                                </h4>

                                                <div className="space-y-4">
                                                    {req.installationRecords.map((record) => {
                                                        const fromMatch = record.available_time?.match(/From:\s*(.*?)(?=\s*To:)/);
                                                        const toMatch = record.available_time?.match(/To:\s*(.*)/);

                                                        const fromDate = fromMatch ? fromMatch[1] : '-';
                                                        const toDate = toMatch ? toMatch[1] : '-';

                                                        return (
                                                            <div
                                                                key={record.job_id}
                                                                className="bg-white rounded-xl border border-gray-300 shadow p-5 hover:shadow-md transition-all"
                                                            >
                                                                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm leading-relaxed">

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">Job Type:</span>
                                                                        <span className="ml-2 font-semibold text-green-600">Installation</span>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">From:</span>
                                                                        <span className="ml-2 text-gray-800">{fromDate}</span>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">To:</span>
                                                                        <span className="ml-2 text-gray-800">{toDate}</span>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">Location:</span>
                                                                        <span className="ml-2 text-gray-800">{record.location || '-'}</span>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">Units:</span>
                                                                        <span className="ml-2 font-semibold text-blue-600">
                                                                            {record.no_of_installed}
                                                                        </span>
                                                                    </div>

                                                                    <div>
                                                                        <span className="text-gray-500 font-medium">Vehicle type:</span>
                                                                        <span className="ml-2 font-semibold text-blue-600">
                                                                            {record.veh_type}
                                                                        </span>
                                                                    </div>

                                                                    <div className="md:col-span-2">
                                                                        <span className="text-gray-500 font-medium">Contact:</span>
                                                                        <span className="ml-2 text-gray-800">{record.contact_person || '-'}</span>
                                                                        {record.contact_number && (
                                                                            <span className="ml-1 text-gray-600">({record.contact_number})</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            {filteredRequests.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                    No packages found for installation requests.
                </div>
            )}
        </div>
    );

    const isRaisingInstallation = selectedReq?.installationStatus === "Approved";

    return (
        <div className="p-4 h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
                    Installation Management Dashboard
                </h1>
                <input
                    type="text"
                    placeholder="Search by company or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
            </div>

            <div className="flex border-b border-gray-200 mb-4">
                <button
                    className={`py-2 px-6 font-medium transition-colors duration-200 rounded-t-lg ${activeTab === 'requests'
                            ? 'border-b-2 border-orange-500 text-orange-600 bg-white'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    onClick={() => setActiveTab('requests')}
                >
                    Installation Requests
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading data...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
                <RequestTable />
            )}

            {selectedReq && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col text-base">

                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex-shrink-0 relative">
                            <button
                                onClick={() => setSelectedReq(null)}
                                className="absolute top-4 right-4 p-3 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                            >
                                <X size={24} strokeWidth={2} />
                            </button>
                            <h2 className="text-3xl font-bold text-white pr-12">
                                {isRaisingInstallation
                                    ? `Raise Installation Progress`
                                    : `Request New Installation`}
                            </h2>
                            <p className="text-blue-100 text-base mt-2">
                                Client: <span className="font-semibold">{selectedReq.companyName}</span>
                            </p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">

                            {isRaisingInstallation && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    {[
                                        {
                                            icon: DollarSign,
                                            label: "Total Approved",
                                            value: selectedReq.adminApprovedCount,
                                            iconBg: "bg-green-50",
                                            iconText: "text-green-600",
                                            valueColor: "text-green-700",
                                        },
                                        {
                                            icon: Clock,
                                            label: "Already Installed",
                                            value: selectedReq.totalInstalled || 0,
                                            iconBg: "bg-blue-50",
                                            iconText: "text-blue-600",
                                            valueColor: "text-blue-700",
                                        },
                                        {
                                            icon: MapPin,
                                            label: "Remaining Units",
                                            value: selectedReq.remainingToInstall,
                                            iconBg: "bg-orange-50",
                                            iconText: "text-orange-600",
                                            valueColor: "text-orange-700",
                                        },
                                    ].map(({ icon: Icon, label, value, iconBg, iconText, valueColor }, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className={`${iconBg} ${iconText} p-3 rounded-lg`}>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
                                                <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">Installation Details</h3>

                                <div className="space-y-5">
                                    {!isRaisingInstallation && (
                                        <FormField label="Number of Installations" isRequired>
                                            <input
                                                type="number"
                                                min="1"
                                                value={form.no_of_installations}
                                                onChange={(e) => handleChange("no_of_installations", e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Enter number of units"
                                            />
                                        </FormField>
                                    )}

                                    {isRaisingInstallation && (
                                        <>
                                            <FormField label="Units to Install (from remaining)" isRequired>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max={selectedReq.remainingToInstall}
                                                    value={form.no_of_installations}
                                                    onChange={(e) => handleChange("no_of_installations", e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    placeholder={`Max: ${selectedReq.remainingToInstall}`}
                                                />
                                            </FormField>

                                            <FormField label="Contact Person" isRequired>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={form.contact_person}
                                                        onChange={(e) => handleChange("contact_person", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder="Enter contact person name"
                                                    />
                                                </div>
                                            </FormField>

                                            <FormField label="Contact Number" isRequired>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="tel"
                                                        value={form.contact_number}
                                                        onChange={(e) => handleChange("contact_number", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                            </FormField>

                                            <FormField label="Installation Location" isRequired>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={form.location}
                                                        onChange={(e) => handleChange("location", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder="Enter installation address"
                                                    />
                                                </div>
                                            </FormField>

                                            <div>
                                                <label className="text-sm font-semibold text-gray-600 block mb-2">
                                                    Quick Date Selection
                                                </label>
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDatePresetChange("today")}
                                                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                                                            form.date_preset === "today"
                                                                ? "bg-blue-500 text-white border-blue-500"
                                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                                        }`}
                                                    >
                                                        Today
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDatePresetChange("tomorrow")}
                                                        className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                                                            form.date_preset === "tomorrow"
                                                                ? "bg-blue-500 text-white border-blue-500"
                                                                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                                        }`}
                                                    >
                                                        Tomorrow
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField label="Available From Date" isRequired>
                                                    <input
                                                        type="date"
                                                        value={form.available_from_date}
                                                        onChange={(e) => handleChange("available_from_date", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </FormField>

                                                <FormField label="Available From Time" isRequired>
                                                    <input
                                                        type="time"
                                                        value={form.available_from_time}
                                                        onChange={(e) => handleChange("available_from_time", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </FormField>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField label="Available To Date" isRequired>
                                                    <input
                                                        type="date"
                                                        value={form.available_to_date}
                                                        onChange={(e) => handleChange("available_to_date", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </FormField>

                                                <FormField label="Available To Time" isRequired>
                                                    <input
                                                        type="time"
                                                        value={form.available_to_time}
                                                        onChange={(e) => handleChange("available_to_time", e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    />
                                                </FormField>
                                            </div>

                                            <FormField label="Select Vehicle Types" isRequired>
                                                <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto">
                                                    {vehicleTypes.length > 0 ? (
                                                        vehicleTypes.map((vehicle) => (
                                                            <label
                                                                key={vehicle.id}
                                                                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={form.selected_vehicles.includes(vehicle.id)}
                                                                    onChange={(e) => handleVehicleChange(vehicle.id, e.target.checked)}
                                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                                />
                                                                <div className="flex items-center space-x-2">
                                                                    <Truck size={18} className="text-gray-600" />
                                                                    <span className="text-sm font-medium text-gray-700">
                                                                        {vehicle.veh_type}
                                                                    </span>
                                                                </div>
                                                            </label>
                                                        ))
                                                    ) : (
                                                        <p className="text-sm text-gray-500 text-center py-2">No vehicle types available</p>
                                                    )}
                                                </div>
                                                {form.selected_vehicles.length > 0 && (
                                                    <p className="text-xs text-gray-600 mt-2">
                                                        {form.selected_vehicles.length} vehicle type(s) selected
                                                    </p>
                                                )}
                                            </FormField>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setSelectedReq(null)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
                                >
                                    {isRaisingInstallation ? "Raise Installation" : "Submit Request"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewInstallationRequest;