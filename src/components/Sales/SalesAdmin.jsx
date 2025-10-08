import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Users, ChevronDown, FileText, X, AlertTriangle, Check, CheckSquare } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

// Utility function to format currency (No Change)
const formatCurrency = (amount) => {
    const value = amount || 0;
    return `₹${value.toLocaleString("en-IN")}`; 
};

// --- IMPROVED Confirmation Modal Component ---
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText, icon }) => {
    if (!isOpen) return null;

    const IconComponent = icon;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform scale-100 transition-all duration-200 ease-out">
                <div className="flex flex-col items-center">
                    {/* Icon with subtle background */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-5">
                        <IconComponent size={32} className="text-indigo-600" strokeWidth={2} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                        {title}
                    </h3>
                    
                    {/* Message */}
                    <p className="text-sm text-gray-600 mb-8 text-center leading-relaxed">
                        {message}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- End of Confirmation Modal Component ---


// --- IMPROVED PackageDetailModal Component ---
const PackageDetailModal = ({ pkg, onClose }) => {
    if (!pkg) return null;
    
    const renderPricingSection = (title, price, gstIncluded, plan, month, nextBillDate) => (
        <div className="mb-4 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                    <FileText size={16} className="text-indigo-600" />
                </div>
                <h4 className="text-base font-semibold text-gray-900">{title}</h4>
            </div>
            
            {/* Pricing Details Grid */}
            <div className="space-y-3">
                {/* Amount */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-2xl font-bold text-indigo-700">{formatCurrency(price)}</span>
                </div>
                
                {/* GST Status */}
                <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">GST Included</span>
                    <div className="flex items-center gap-1.5">
                        {gstIncluded ? (
                            <>
                                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <Check size={12} className="text-green-600" strokeWidth={3} />
                                </div>
                                <span className="text-sm font-medium text-green-700">Yes</span>
                            </>
                        ) : (
                            <>
                                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                    <X size={12} className="text-red-600" strokeWidth={3} />
                                </div>
                                <span className="text-sm font-medium text-red-700">No</span>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Billing Plan */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Billing Plan</span>
                    <span className="text-sm font-medium text-gray-900">
                        {plan || 'N/A'} {month ? `(${month} Mo)` : ''}
                    </span>
                </div>
                
                {/* Next Bill Date */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Next Bill Date</span>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {nextBillDate || "One-Time Payment"}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden transform scale-100 transition-all duration-300 ease-out">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Package Details</h3>
                        <p className="text-indigo-100 text-sm">{pkg.solutionType}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                    >
                        <X size={24} strokeWidth={2} />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                    {/* Client Information Section */}
                    <div className="mb-8 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                <Users size={16} className="text-indigo-600" />
                            </div>
                            Client Information
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Company</p>
                                <p className="text-sm font-semibold text-gray-900">{pkg.companyName}</p>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Client Name</p>
                                <p className="text-sm font-medium text-gray-900">{pkg.clientFullName || pkg.userName}</p>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Method</p>
                                <p className="text-sm font-medium text-gray-900">{pkg.paymentMethod || 'N/A'}</p>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Current Status</p>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                    pkg.status === 'Billed' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {pkg.status}
                                </span>
                            </div>
                            
                            <div className="space-y-1 md:col-span-2">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Assigned Team</p>
                                <p className="text-sm font-medium text-gray-900">{pkg.teamName || 'Not Assigned'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Breakdown Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                                <AlertTriangle size={16} className="text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Pricing Breakdown</h3>
                        </div>
                        
                        {pkg.hardware > 0 && renderPricingSection("Hardware/Device Cost", pkg.hardware, pkg.hardwareGstIncluded, pkg.hardwarePlan, pkg.hardwareMonth, pkg.hardware_next_bill_date)}
                        {pkg.installation > 0 && renderPricingSection("Installation/Setup Fee", pkg.installation, pkg.installationGstIncluded, pkg.installationPlan, pkg.installationMonth, pkg.installation_next_bill_date)}
                        {pkg.subscription > 0 && renderPricingSection("Recurring Subscription", pkg.subscription, pkg.subscriptionGstIncluded, pkg.subscriptionPlan, pkg.subscriptionMonth, pkg.subscription_next_bill_date)}
                    </div>
                </div>
            </div>
        </div>
    );
};
// --- End of PackageDetailModal Component ---


const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");
  const [teams, setTeams] = useState([]); 
  const [teamPopup, setTeamPopup] = useState({ isOpen: false, packageId: null, x: 0, y: 0, newTeamId: null }); 
    
  // Detail Modal States 
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Confirmation Modal State
  const [confirmation, setConfirmation] = useState({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: () => {},
      confirmText: '',
      icon: AlertTriangle,
      id: null, 
  });


  const statuses = ["Pending", "Billed", "Rejected"];

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/packages");
        setPackages(res.data.packages || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch packages.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await axiosInstance.get("/packages/teams");
        // Ensure teams is an array, even if the API response is undefined or null
        setTeams(res.data || []); 
      } catch (err) {
        console.error(err);
        // If team fetch fails, set to empty array to prevent map error
        setTeams([]); 
      }
    };

    fetchPackages();
    fetchTeams();
  }, []);

  // Close team popup when clicking outside 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (teamPopup.isOpen && !event.target.closest('.team-popup') && !event.target.closest('.confirmation-modal')) {
        setTeamPopup({ isOpen: false, packageId: null, x: 0, y: 0, newTeamId: null });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [teamPopup.isOpen]);
    
  // Detail Modal Handlers (No Change)
  const handleOpenDetailModal = useCallback((pkg) => {
      setSelectedPackage(pkg);
      setIsDetailModalOpen(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
      setIsDetailModalOpen(false);
      setSelectedPackage(null);
  }, []);
  
  // --- Confirmation Action Handlers (No Change) ---

  // 1. Approval/Rejection Handlers (Open Confirmation)
  const startApprove = (id) => {
      setConfirmation({
          isOpen: true,
          title: 'Confirm Approval',
          message: 'Are you sure you want to approve and mark this package as Billed?',
          onConfirm: () => handleAction(id, "Billed"),
          onCancel: () => setConfirmation({ isOpen: false }),
          confirmText: 'Yes, Approve',
          icon: CheckCircle,
          id: id,
      });
  };

  const startReject = (id) => {
      setConfirmation({
          isOpen: true,
          title: 'Confirm Rejection',
          message: 'Are you sure you want to reject this sales request? This action cannot be undone easily.',
          onConfirm: () => handleAction(id, "Rejected"),
          onCancel: () => setConfirmation({ isOpen: false }),
          confirmText: 'Yes, Reject',
          icon: XCircle,
          id: id,
      });
  };

  // 2. Approval/Rejection Action (Execute API call)
  const handleAction = async (id, status) => {
      setConfirmation({ isOpen: false }); 
      try {
          await axiosInstance.patch(`/packages/${id}/status`, { status });
          setPackages((prev) =>
            prev.map((pkg) => (pkg.id === id ? { ...pkg, status: status } : pkg))
          );
      } catch (err) {
          console.error(err);
          alert(`Failed to ${status.toLowerCase()} package.`);
      }
  };

  // 3. Team Change Handler (Open Confirmation)
  const startTeamChange = (pkgId, newTeamId) => {
      const team = teams.find(t => t.id === parseInt(newTeamId));
      const teamName = team?.team_name || "No Team";
      const pkg = packages.find(p => p.id === pkgId);

      setTeamPopup(prev => ({ ...prev, newTeamId: newTeamId })); 
      
      setTeamPopup(prev => ({ ...prev, isOpen: false }));

      setConfirmation({
          isOpen: true,
          title: 'Confirm Team Change',
          message: `Assign ${pkg.companyName} to the team: ${teamName}? This action updates who sees the task.`,
          onConfirm: () => executeTeamChange(pkgId, newTeamId),
          onCancel: () => {
              setConfirmation({ isOpen: false });
              setTeamPopup(prev => ({ ...prev, newTeamId: null })); 
          },
          confirmText: `Assign to ${teamName}`,
          icon: Users,
      });
  };

  // 4. Team Change Action (Execute API call)
  const executeTeamChange = async (pkgId, newTeamId) => {
      setConfirmation({ isOpen: false }); 
      try {
          const res = await axiosInstance.patch(`/packages/${pkgId}`, { teamId: newTeamId || null }); 
          
          // Update local state
          const team = teams.find((t) => t.id === parseInt(newTeamId));
          setPackages((prev) =>
            prev.map((pkg) =>
              pkg.id === pkgId
                ? { ...pkg, teamId: newTeamId ? parseInt(newTeamId) : null, teamName: team?.team_name || "None" }
                : pkg
            )
          );
      } catch (err) {
          console.error(err);
          alert("Failed to update team.");
      }
  };
  // -----------------------------------------------

  const openTeamPopup = (packageId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTeamPopup({
      isOpen: true,
      packageId,
      x: rect.left,
      y: rect.bottom + window.scrollY,
      newTeamId: null 
    });
  };

  const filteredPackages = useMemo(() => {
    return packages
    .filter((pkg) =>
      activeTab === "Pending"
        ? ["Pending", "Rejected"].includes(pkg.status || "Pending")
        : (pkg.status || "Pending") === activeTab
    )
    .filter(
      (pkg) =>
        (pkg.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pkg.clientFullName || pkg.userName || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [packages, activeTab, searchTerm]);

  const TruncatedText = ({ text, maxLength = 20, onClick }) => {
    const truncated = text && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    return <div className="truncate cursor-pointer" title={text} onClick={onClick}>{truncated || text}</div>;
  };

  // --- TeamPopup Component ---
  const TeamPopup = () => {
    if (!teamPopup.isOpen) return null;

    const currentPackage = packages.find(pkg => pkg.id === teamPopup.packageId);
    
    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-opacity-10 z-40"></div>
        
        {/* Popup */}
        <div 
          className="team-popup fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-64 max-h-64 overflow-y-auto"
          style={{
            left: `${teamPopup.x}px`,
            top: `${teamPopup.y + 5}px`
          }}
        >
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users size={14} />
              Select Team
            </h3>
          </div>
          <div className="py-2">
            <button
              onClick={() => startTeamChange(teamPopup.packageId, "")} 
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                !currentPackage?.teamId ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
              }`}
            >
              No Team Assigned
            </button>
            {(teams || []).map((team) => (
              <button
                key={team.id}
                onClick={() => startTeamChange(teamPopup.packageId, team.id)} 
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                  currentPackage?.teamId === team.id ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                }`}
              >
                {team.team_name}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };
 // --- End of TeamPopup Component ---

  return (
    <div className="p-4 h-full relative">
      {/* Tabs & Search */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex space-x-1">
          {statuses.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by company or client"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="bg-white shadow rounded-lg border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-2 py-3"></th>
                <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Company</th>
                <th className="w-32 px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                <th className="w-28 px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Solution</th>
                <th className="w-20 px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Hardware</th>
                <th className="w-20 px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Install</th>
                <th className="w-24 px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Subscription</th>
                <th className="w-20 px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="w-48 px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Team</th>
                <th className="w-20 px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="w-20 px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => {
                const currentTeam = teams.find(t => t.id === pkg.teamId);
                
                return (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-3">
                      <TruncatedText 
                            text={pkg.companyName} 
                            className="text-blue-600 font-medium" 
                            onClick={(e) => { e.stopPropagation(); handleOpenDetailModal(pkg); }}
                        />
                    </td>
                    <td className="px-3 py-3">
                      <TruncatedText 
                            text={pkg.clientFullName || pkg.userName} 
                            onClick={(e) => { e.stopPropagation(); handleOpenDetailModal(pkg); }}
                        />
                    </td>
                    <td className="px-3 py-3">
                      <TruncatedText 
                            text={pkg.solutionType} 
                            onClick={(e) => { e.stopPropagation(); handleOpenDetailModal(pkg); }}
                        />
                    </td>
                    <td className="px-3 py-3 text-right">{formatCurrency(pkg.hardware)}</td>
                    <td className="px-3 py-3 text-right">{formatCurrency(pkg.installation)}</td>
                    <td className="px-3 py-3 text-right">{formatCurrency(pkg.subscription)}</td>
                    <td className="px-3 py-3 text-right font-bold text-blue-600">{formatCurrency(pkg.totalAmount)}</td>
                    <td className="px-3 py-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); openTeamPopup(pkg.id, e); }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-md hover:border-orange-400 hover:bg-orange-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        title={currentTeam ? currentTeam.team_name : "No team assigned"}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <Users size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="text-left font-medium text-gray-700 truncate">
                            {currentTeam ? currentTeam.team_name : "Select Team"}
                          </span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          pkg.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : pkg.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex justify-center gap-2">
                            {/* View Details Button */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleOpenDetailModal(pkg); }} 
                                className="p-1.5 rounded hover:bg-gray-100" 
                                title="View Details"
                            >
                            <FileText size={16} className="text-blue-600" />
                          </button>
                        
                            {pkg.status === "Pending" ? (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); startApprove(pkg.id); }} className="p-1.5 rounded hover:bg-green-100" title="Approve">
                                <CheckCircle size={16} className="text-green-600" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); startReject(pkg.id); }} className="p-1.5 rounded hover:bg-red-100" title="Reject">
                                <XCircle size={16} className="text-red-600" />
                              </button>
                            </>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              {searchTerm ? "No packages match your search." : "No packages available."}
            </div>
          )}
        </div>
      )}

      {/* Team Selection Popup */}
      <TeamPopup />
      
      {/* Package Detail Modal */}
      {isDetailModalOpen && <PackageDetailModal pkg={selectedPackage} onClose={handleCloseDetailModal} />}

      {/* Confirmation Modal */}
      <ConfirmationModal 
          isOpen={confirmation.isOpen}
          title={confirmation.title}
          message={confirmation.message}
          onConfirm={confirmation.onConfirm}
          onCancel={confirmation.onCancel}
          confirmText={confirmation.confirmText}
          icon={confirmation.icon}
      />
    </div>
  );
};

export default AdminPackages;