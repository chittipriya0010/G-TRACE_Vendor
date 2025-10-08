import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FileText, Edit, Trash2, X, AlertTriangle, CheckCircle, Check } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";

// Utility function to format currency
const formatCurrency = (amount) => {
  const value = amount || 0;
  return `₹${value.toLocaleString("en-IN")}`;
};

// --- Reusable Input Field Component for Edit Modal ---
const PriceInput = ({ label, name, value, onChange, isCurrency = true }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1 flex rounded-md shadow-sm">
            {isCurrency && (
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    ₹
                </span>
            )}
            <input
                type="number"
                name={name}
                id={name}
                value={value || 0}
                onChange={onChange}
                className={`block w-full flex-1 rounded-none ${isCurrency ? '' : 'rounded-l-md'} rounded-r-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                min="0"
            />
        </div>
    </div>
);

// --- IMPROVED PackageEditModal Component ---
const PackageEditModal = ({ pkg, onClose, onSave }) => {
    if (!pkg) return null;

    const initialFormData = useMemo(() => ({
        companyName: pkg.companyName || '',
        clientFullName: pkg.clientFullName || '',
        solutionType: pkg.solutionType || '',
        paymentMethod: pkg.paymentMethod || '',
        // Hardware fields
        hardware: pkg.hardware || 0,
        hardwareGstIncluded: pkg.hardwareGstIncluded || false,
        hardwarePlan: pkg.hardwarePlan || '',
        hardwareMonth: pkg.hardwareMonth || 0,
        hardware_next_bill_date: pkg.hardware_next_bill_date || '',
        // Installation fields
        installation: pkg.installation || 0,
        installationGstIncluded: pkg.installationGstIncluded || false,
        installationPlan: pkg.installationPlan || '',
        installationMonth: pkg.installationMonth || 0,
        installation_next_bill_date: pkg.installation_next_bill_date || '',
        // Subscription fields
        subscription: pkg.subscription || 0,
        subscriptionGstIncluded: pkg.subscriptionGstIncluded || false,
        subscriptionPlan: pkg.subscriptionPlan || '',
        subscriptionMonth: pkg.subscriptionMonth || 0,
        subscription_next_bill_date: pkg.subscription_next_bill_date || '',
    }), [pkg]);

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        const newTotalAmount = (formData.hardware || 0) + (formData.installation || 0) + (formData.subscription || 0);
        const updatedData = { ...formData, totalAmount: newTotalAmount };

        try {
            alert(`Simulating Save for Package ID: ${pkg.id}. New Calculated Total: ${formatCurrency(newTotalAmount)}`);
            onSave({ ...pkg, ...updatedData });
            onClose();
        } catch (error) {
             console.error("Failed to update package:", error);
             alert("Failed to save changes. Check console for details.");
        }
    };

    const renderPricingFields = (prefix, title) => (
        <div className="p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                    <FileText size={16} className="text-indigo-600" />
                </div>
                <h4 className="text-base font-semibold text-gray-900">{title}</h4>
            </div>
            
            <div className="space-y-4">
                <PriceInput 
                    label="Amount" 
                    name={prefix}
                    value={formData[prefix]} 
                    onChange={handleChange} 
                />

                <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                        <input
                            type="checkbox"
                            name={`${prefix}GstIncluded`}
                            checked={formData[`${prefix}GstIncluded`]}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-2"
                        />
                        GST Included
                    </label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor={`${prefix}Plan`} className="block text-sm font-medium text-gray-700 mb-1">Billing Plan</label>
                        <input
                            type="text"
                            name={`${prefix}Plan`}
                            value={formData[`${prefix}Plan`]}
                            onChange={handleChange}
                            placeholder="e.g., Monthly"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        />
                    </div>
                    <div>
                        <label htmlFor={`${prefix}Month`} className="block text-sm font-medium text-gray-700 mb-1">Duration (Months)</label>
                        <input
                            type="number"
                            name={`${prefix}Month`}
                            value={formData[`${prefix}Month`]}
                            onChange={handleChange}
                            placeholder="0 for N/A"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                            min="0"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor={`${prefix}_next_bill_date`} className="block text-sm font-medium text-gray-700 mb-1">Next Bill Date</label>
                    <input
                        type="text"
                        name={`${prefix}_next_bill_date`}
                        value={formData[`${prefix}_next_bill_date`]}
                        onChange={handleChange}
                        placeholder="YYYY-MM-DD or One-Time"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Edit Package</h3>
                        <p className="text-indigo-100 text-sm">{pkg.companyName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                        <X size={24} strokeWidth={2} />
                    </button>
                </div>
                
                <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                    <div className="mb-6 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                <FileText size={16} className="text-indigo-600" />
                            </div>
                            General Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input 
                                    type="text" 
                                    name="companyName" 
                                    value={formData.companyName} 
                                    onChange={handleChange} 
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                                />
                            </div>
                            <div>
                                <label htmlFor="clientFullName" className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                <input 
                                    type="text" 
                                    name="clientFullName" 
                                    value={formData.clientFullName} 
                                    onChange={handleChange} 
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                                />
                            </div>
                            <div>
                                <label htmlFor="solutionType" className="block text-sm font-medium text-gray-700 mb-1">Solution Type</label>
                                <input 
                                    type="text" 
                                    name="solutionType" 
                                    value={formData.solutionType} 
                                    onChange={handleChange} 
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                                />
                            </div>
                            <div>
                                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                <input 
                                    type="text" 
                                    name="paymentMethod" 
                                    value={formData.paymentMethod} 
                                    onChange={handleChange} 
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                                <AlertTriangle size={16} className="text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Pricing Components</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {renderPricingFields('hardware', 'Hardware/Device Cost')}
                            {renderPricingFields('installation', 'Installation/Setup')}
                            {renderPricingFields('subscription', 'Subscription')}
                        </div>
                    </div>
                    
                    <div className="border-t pt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// --- End of PackageEditModal Component ---

// --- IMPROVED PackageDetailModal Component ---
const PackageDetailModal = ({ pkg, onClose }) => {
  if (!pkg) return null;

  const renderPricingSection = (title, price, gstIncluded, plan, month, nextBillDate) => (
    <div className="mb-4 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
          <FileText size={16} className="text-indigo-600" />
        </div>
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Amount</span>
          <span className="text-2xl font-bold text-indigo-700">{formatCurrency(price)}</span>
        </div>
        
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
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Billing Plan</span>
          <span className="text-sm font-medium text-gray-900">
            {plan || 'N/A'} {month ? `(${month} Mo)` : ''}
          </span>
        </div>
        
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden transform scale-100 transition-all duration-300 ease-out">
        
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
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="mb-8 p-5 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <FileText size={16} className="text-indigo-600" />
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
                <p className="text-sm font-medium text-gray-900">{pkg.clientFullName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Method</p>
                <p className="text-sm font-medium text-gray-900">{pkg.paymentMethod}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Current Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  pkg.status === 'Billed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {pkg.status}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                <AlertTriangle size={16} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pricing Breakdown</h3>
            </div>
            
            {pkg.hardware > 0 && renderPricingSection(
              "Hardware/Device Cost",
              pkg.hardware,
              pkg.hardwareGstIncluded,
              pkg.hardwarePlan,
              pkg.hardwareMonth,
              pkg.hardware_next_bill_date
            )}
            
            {pkg.installation > 0 && renderPricingSection(
              "Installation/Setup Fee",
              pkg.installation,
              pkg.installationGstIncluded,
              pkg.installationPlan,
              pkg.installationMonth,
              pkg.installation_next_bill_date
            )}

            {pkg.subscription > 0 && renderPricingSection(
              "Recurring Subscription",
              pkg.subscription,
              pkg.subscriptionGstIncluded,
              pkg.subscriptionPlan,
              pkg.subscriptionMonth,
              pkg.subscription_next_bill_date
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// --- End of PackageDetailModal Component ---


const DisplayBilledInformation = ({ onSelectCompany, onEditCompany }) => {
  const [activeTab, setActiveTab] = useState("Pending"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState([]);
  const [statuses] = useState(["Pending", "Billed"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  const [deleteMessage, setDeleteMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (deleteMessage.text) {
      const timer = setTimeout(() => setDeleteMessage({ text: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get("/packages");
        const pkgData = (response.data.packages || response.data).map(p => ({
            ...p,
            status: p.status || 'Pending'
        }));
        setPackages(pkgData);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setError("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/api/packages/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "PACKAGE_UPDATED") {
        setPackages(prev =>
          prev.map(pkg => (pkg.id === data.package.id ? { ...pkg, ...data.package } : pkg))
        );
      }
    };

    return () => eventSource.close();
  }, []);

  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg =>
        activeTab === "Pending"
          ? ["Pending", "Rejected"].includes(pkg.status || "Pending")
          : (pkg.status || "Pending") === activeTab
      )
      .filter(pkg =>
        (pkg.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pkg.clientFullName || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [packages, activeTab, searchTerm]);

  const handleViewDetails = useCallback(
    (pkg) => {
      setSelectedPackage(pkg);
      setIsDetailModalOpen(true);
      onSelectCompany?.(pkg);
    },
    [onSelectCompany]
  );
    
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPackage(null);
  };
    
  const handleOpenEditModal = useCallback(
    (pkg) => {
        if (["Pending", "Rejected"].includes(pkg.status)) {
            setSelectedPackage(pkg);
            setIsEditModalOpen(true);
            onEditCompany?.(pkg); 
        }
    },
    [onEditCompany]
  );

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPackage(null);
  };

  const handlePackageSave = (updatedPackage) => {
      setPackages(prev => prev.map(p => (p.id === updatedPackage.id ? updatedPackage : p)));
  }

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this package? This action cannot be undone.")) return;

    try {
      setDeleteMessage({ text: '', type: '' });
      await axiosInstance.delete(`/packages/${id}`);
      setPackages(prev => prev.filter(p => p.id !== id));
      setDeleteMessage({ text: 'Package successfully deleted!', type: 'success' });
    } catch (err) {
      console.error(err);
      setDeleteMessage({ text: "Failed to delete the package. Please try again.", type: 'error' });
    }
  }, []);

  const TruncatedText = useCallback(({ text, maxLength = 20, className = "", onClick }) => {
    const truncated = text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    return (
      <div className={`${className} truncate cursor-pointer`} title={text} onClick={onClick}>
        {truncated || text}
      </div>
    );
  }, []);

  const getStatusColor = (status) => {
      switch(status) {
          case "Pending":
              return "bg-yellow-100 text-yellow-800";
          case "Rejected":
              return "bg-red-100 text-red-800";
          case "Billed":
              return "bg-green-100 text-green-800";
          default:
              return "bg-gray-100 text-gray-800";
      }
  };
    
  const isEditable = (pkg) => ["Pending", "Rejected"].includes(pkg.status);


  return (
    <div className="p-4 h-full bg-gray-50">
      
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex space-x-1">
          {statuses.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-orange-600 text-white shadow-lg"
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
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
        />
      </div>
        
      {deleteMessage.text && (
        <div 
          className={`p-3 mb-4 rounded-lg text-sm font-medium shadow-md flex items-center ${
            deleteMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {deleteMessage.type === 'success' ? <CheckCircle size={18} className="mr-2"/> : <AlertTriangle size={18} className="mr-2"/>}
          {deleteMessage.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm table-fixed border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-10 px-2 py-3"></th>
                <th className="w-[18%] px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="w-[18%] px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                <th className="w-[12%] px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Solution</th>
                <th className="w-[12%] px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Hardware</th>
                <th className="w-[12%] px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Install</th>
                <th className="w-[12%] px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="w-[10%] px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="w-[6%] px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg, idx) => (
                <tr
                  key={pkg.id}
                  className={`transition-colors cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                  onClick={() => handleViewDetails(pkg)} 
                >
                  <td className="px-2 py-3"></td>
                  <td className="px-3 py-3">
                    <TruncatedText
                      text={pkg.companyName}
                      className="text-blue-600 font-medium hover:underline"
                      onClick={(e) => {e.stopPropagation(); handleViewDetails(pkg);}} 
                    />
                  </td>
                  <td className="px-3 py-3">
                    <TruncatedText text={pkg.clientFullName} onClick={(e) => {e.stopPropagation(); handleViewDetails(pkg);}} />
                  </td>
                  <td className="px-3 py-3">
                    <TruncatedText text={pkg.solutionType} onClick={(e) => {e.stopPropagation(); handleViewDetails(pkg);}} />
                  </td>
                  <td className="px-3 py-3 text-right font-medium">{formatCurrency(pkg.hardware)}</td>
                  <td className="px-3 py-3 text-right font-medium">{formatCurrency(pkg.installation)}</td>
                  <td className="px-3 py-3 text-right font-medium">{formatCurrency(pkg.subscription)}</td>
                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}
                    >
                      {pkg.status || "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); handleViewDetails(pkg); }} className="p-1 rounded-lg hover:bg-gray-200 transition" title="View Details">
                        <FileText size={16} className="text-gray-500 hover:text-blue-600" />
                      </button>
                      
                      <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenEditModal(pkg); }} 
                          className={`p-1 rounded-lg transition ${isEditable(pkg) ? 'hover:bg-gray-200' : 'cursor-not-allowed'}`} 
                          title={isEditable(pkg) ? "Edit Package" : "Cannot edit Billed package"}
                          disabled={!isEditable(pkg)}
                      >
                        <Edit size={16} className={isEditable(pkg) ? "text-gray-500 hover:text-orange-600" : "text-gray-400 opacity-50"} />
                      </button>
                      
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(pkg.id); }} className="p-1 rounded-lg hover:bg-red-100 transition" title="Delete Package">
                        <Trash2 size={16} className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              {searchTerm ? "No packages found matching your search." : "No packages available."}
            </div>
          )}
        </div>
      )}

      {isDetailModalOpen && <PackageDetailModal pkg={selectedPackage} onClose={handleCloseDetailModal} />}
      
      {isEditModalOpen && <PackageEditModal pkg={selectedPackage} onClose={handleCloseEditModal} onSave={handlePackageSave} />}

    </div>
  );
};

export default DisplayBilledInformation;