import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// Setup for external dependencies (assuming they are available in the execution environment)
// Note: In a real environment, you'd need proper imports/mocks for useNavigate, useLocation, and axiosInstance.

const paymentMethods = ["Non Cheque", "Cheque / RTGS"];

const hardwarePlans = [
  "One-Time",
  "Monthly",
  "Quarterly",
  "Half Yearly",
  "Yearly",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
];

const genericPlans = [...hardwarePlans];

// Utility: GST calculation
const computeGST = (amount, isIncluded) => {
  if (!amount) return 0;
  // Note: Assuming amount is pre-tax if GST is included, calculation remains the same
  return isIncluded ? Math.round(Number(amount) * 0.18) : 0;
};

// Utility: Dynamic duration label
const getDurationLabel = (plan, isPerpetual) => {
  if (isPerpetual) {
    return "Duration (Ongoing)";
  }

  switch (plan) {
    case "Monthly":
      return "Duration (Months)";
    case "Quarterly":
      return "Duration (Quarters)";
    case "Half Yearly":
      return "Duration (Half Years)";
    case "Yearly":
      return "Duration (Years)";
    case "2 years":
      return "Duration (2-Year Cycles)";
    case "3 years":
      return "Duration (3-Year Cycles)";
    case "4 years":
      return "Duration (4-Year Cycles)";
    case "5 years":
      return "Duration (5-Year Cycles)";
    case "One-Time":
      return "One-Time";
    default:
      return "Duration";
  }
};

// Utility: Render duration input
const renderDurationInput = (plan, value, name, handleChange, isPerpetual) => {
  // If the perpetual flag is set, display "Ongoing" and disable the input
  if (isPerpetual) {
    return (
      <input
        type="text"
        value="Ongoing"
        disabled
        onChange={handleChange}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
      />
    );
  }

  if (plan === "One-Time") {
    return (
      <input
        type="number"
        value="0"
        disabled
        onChange={handleChange}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
      />
    );
  }

  // For fixed multi-year plans, duration is always 1 cycle (but stored as number of cycles)
  if (["2 years", "3 years", "4 years", "5 years"].includes(plan)) {
    return (
      <input
        type="number"
        name={name}
        value={value || 1}
        disabled
        onChange={handleChange}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
      />
    );
  }

  // Quarterly / Half Yearly logic (dynamic duration in months)
  if (["Quarterly", "Half Yearly"].includes(plan)) {
    const step = plan === "Quarterly" ? 3 : 6;
    return (
      <input
        type="number"
        name={name}
        value={value || ""}
        min={step}
        step={step}
        onChange={handleChange}
        placeholder={`Multiples of ${step}`}
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
      />
    );
  }

  // Monthly / Yearly logic (dynamic duration)
  return (
    <input
      type="number"
      name={name}
      value={value || ""}
      min="1"
      onChange={handleChange}
      placeholder="Duration"
      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
    />
  );
};

// Utility: Calculate next bill date
const calculateNextBillDate = (plan, durationValue, isPerpetual) => {
  const startDate = new Date();

  // Determine months to add per cycle
  let monthsPerCycle = 0;

  switch (plan) {
    case "Monthly":
      monthsPerCycle = 1;
      break;
    case "Quarterly":
      monthsPerCycle = 3;
      break;
    case "Half Yearly":
      monthsPerCycle = 6;
      break;
    case "Yearly":
      monthsPerCycle = 12;
      break;
    case "2 years":
      monthsPerCycle = 24;
      break;
    case "3 years":
      monthsPerCycle = 36;
      break;
    case "4 years":
      monthsPerCycle = 48;
      break;
    case "5 years":
      monthsPerCycle = 60;
      break;
    case "One-Time":
    default:
      return null;
  }

  let totalMonthsToAdd = 0;

  if (isPerpetual) {
    // For ongoing plans, always add 1 cycle from current date
    totalMonthsToAdd = monthsPerCycle;
  } else {
    // For fixed-duration plans, multiply by durationValue
    const duration = Number(durationValue);
    if (!duration || duration <= 0) return null;
    totalMonthsToAdd = monthsPerCycle * duration;
  }

  // Calculate next bill date
  const nextBillDate = new Date(startDate);
  nextBillDate.setMonth(startDate.getMonth() + totalMonthsToAdd);

  const yyyy = nextBillDate.getFullYear();
  const mm = String(nextBillDate.getMonth() + 1).padStart(2, "0");
  const dd = String(nextBillDate.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};


// PackageCard Component
// Receives the actual data object for the current package (e.g., pricingPackages['internet'].hardware)
// PackageCard Component
// Receives the actual data object for the current package (e.g., pricingPackages['internet'].hardware)
const PackageCard = React.memo(
  ({
    title,
    packageName, // e.g., 'hardware'
    solution, // e.g., 'internet'
    data, // The actual package object { amount: "100", plan: "Monthly", ... }
    errors,
    handleChange,
    handleNumberChange,
    plansArray,
  }) => {
    // Dynamic field names for binding inputs to state
    const namePrefix = `${solution}_${packageName}`; 
    const amountName = `${namePrefix}Amount`;
    const gstName = `${namePrefix}GstIncluded`;
    const planName = `${namePrefix}Plan`;
    const monthName = `${namePrefix}Month`;
    const isPerpetualName = `${namePrefix}IsPerpetual`;

    const amount = Number(data.amount) || 0;
    const gst = computeGST(amount, data.gstIncluded);
    const perCycleTotal = amount + gst;
    const isPerpetual = data.isPerpetual;

    // Calculate next bill date for display purposes
    const nextBillDate = calculateNextBillDate(
        data.plan,
        data.month,
        isPerpetual
    );

    // Icon colors based on package type
    const iconColors = {
      hardware: 'text-purple-600 bg-purple-50',
      installation: 'text-emerald-600 bg-emerald-50',
      subscription: 'text-blue-600 bg-blue-50'
    };

    const iconColor = iconColors[packageName] || 'text-gray-600 bg-gray-50';

    return (
      <div className="group relative border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
        {/* Package Header with Icon */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
          <div className={`w-10 h-10 rounded-lg ${iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {packageName === 'hardware' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            )}
            {packageName === 'installation' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            {packageName === 'subscription' && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-1">
              {title}
              <span className="text-red-500 text-lg">*</span>
            </h3>
            <p className="text-xs text-gray-500 capitalize">{packageName} Package</p>
          </div>
        </div>

        {/* Amount Input with Currency Icon */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-2">Package Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
            <input
              name={amountName}
              value={data.amount}
              onChange={handleNumberChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          {errors[amountName] && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors[amountName]}
            </p>
          )}
        </div>

        {/* GST Section with Modern Toggle */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">GST (18%)</span>
            <span className="font-bold text-sm text-blue-600">₹{gst.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex gap-3">
            <label className="flex-1 relative cursor-pointer">
              <input
                type="radio"
                checked={data.gstIncluded}
                onChange={() =>
                  handleChange({
                    target: {
                      name: gstName,
                      type: "checkbox",
                      checked: true,
                    },
                  })
                }
                className="peer sr-only"
              />
              <div className="px-3 py-2 text-xs font-medium text-center rounded-md border-2 border-gray-300 bg-white peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white transition-all">
                Including GST
              </div>
            </label>
            <label className="flex-1 relative cursor-pointer">
              <input
                type="radio"
                checked={!data.gstIncluded}
                onChange={() =>
                  handleChange({
                    target: {
                      name: gstName,
                      type: "checkbox",
                      checked: false,
                    },
                  })
                }
                className="peer sr-only"
              />
              <div className="px-3 py-2 text-xs font-medium text-center rounded-md border-2 border-gray-300 bg-white peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white transition-all">
                Excluding GST
              </div>
            </label>
          </div>
        </div>

        {/* Plan & Duration */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Plan Type
            </label>
            <select
              name={planName}
              value={data.plan}
              onChange={handleChange}
              disabled={isPerpetual} 
              className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isPerpetual ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
            >
              {plansArray.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              {getDurationLabel(data.plan, isPerpetual)}
            </label>
            {renderDurationInput(
              data.plan,
              data.month,
              monthName,
              handleChange,
              isPerpetual
            )}
            {errors[monthName] && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors[monthName]}
              </p>
            )}
          </div>
        </div>

        {/* Perpetual/Ongoing Toggle with Better Design */}
        <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              name={isPerpetualName}
              checked={isPerpetual}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <div className="ml-3">
              <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                Perpetual/Ongoing Plan
              </span>
              <p className="text-xs text-gray-600 mt-0.5">Auto-renewing subscription</p>
            </div>
          </label>
        </div>

        {/* Totals & Next Bill Date with Enhanced Styling */}
        {(data.amount || isPerpetual) && (
          <div className="mt-4 pt-4 border-t-2 border-gray-200 space-y-3">
            {/* Per Cycle Total */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <span className="text-xs font-semibold text-gray-700">Per Cycle Total (Incl. GST)</span>
              <span className="font-bold text-xl text-blue-600">
                ₹{perCycleTotal.toLocaleString("en-IN")}
              </span>
            </div>
            
            {/* Next Bill Date */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Next Bill Date</span>
              </div>
              <span className={`font-bold text-sm ${nextBillDate || isPerpetual ? 'text-green-700' : 'text-gray-400'}`}>
                {nextBillDate || (isPerpetual ? 'Ongoing' : 'N/A')}
              </span>
            </div>
          </div>
        )}

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 pointer-events-none transition-all duration-300"></div>
      </div>
    );
  }
);

// --- Initialization Helpers ---
const initialPackageState = {
  amount: "",
  gstIncluded: false,
  plan: "One-Time",
  month: "0",
  isPerpetual: false,
};

const getInitialPricingPackage = () => ({
  hardware: { ...initialPackageState },
  installation: { ...initialPackageState },
  subscription: { ...initialPackageState },
});


// Main SelectPackage Component
const SelectPackage = ({ activeStep = 2, onConfirm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const clientId = location.state?.clientId;
  const billId = location.state?.billId;

  const [solutionTypes, setSolutionTypes] = useState([]);
  const [teams, setTeams] = useState([]);

  // 1. Base form state for non-dynamic fields
  const [form, setForm] = useState({
    solutionType: [],
    teamId: "",
    paymentMethod: "",
  });
  
  // 2. Dynamic state for pricing packages
  const [pricingPackages, setPricingPackages] = useState({});

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Static helper maps now only define relationships, not dynamic keys
  const planFields = {
    Plan: "Month",
  };

  const isPerpetualFields = {
    IsPerpetual: { plan: "Plan", month: "Month" },
  }
  
  // --- State Synchronization ---
  useEffect(() => {
    // Sync pricingPackages state based on selected solution types
    const newPackages = {};
    form.solutionType.forEach(solution => {
      // Preserve existing data or use initial state
      newPackages[solution] = pricingPackages[solution] 
        ? pricingPackages[solution] 
        : getInitialPricingPackage();
    });
    setPricingPackages(newPackages);
  }, [form.solutionType]);


  // --- Change Handlers ---
  
  // Utility to parse dynamic field names
  const parseFieldName = (name) => {
    // Expected format: 'solution_packageFieldName' (e.g., 'internet_hardwareAmount')
    const parts = name.split('_');
    if (parts.length < 2) return { isDynamic: false };

    const solution = parts[0]; // e.g., 'internet'
    // The rest is the package field name, e.g., 'hardwareAmount'
    const packageFieldName = parts.slice(1).join('_');

    // e.g., 'hardwareAmount' -> 'hardware', 'Amount'
    const packageTypeMatch = packageFieldName.match(/^(hardware|installation|subscription)(.*)$/);
    if (!packageTypeMatch) return { isDynamic: true, solution, packageType: null };
    
    const packageType = packageTypeMatch[1]; // e.g., 'hardware'
    const fieldSuffix = packageTypeMatch[2]; // e.g., 'Amount', 'IsPerpetual'

    // Map the field suffix back to the key in the nested object ('Amount' -> 'amount')
    let fieldName;
    if (fieldSuffix === 'Amount') fieldName = 'amount';
    else if (fieldSuffix === 'GstIncluded') fieldName = 'gstIncluded';
    else if (fieldSuffix === 'Plan') fieldName = 'plan';
    else if (fieldSuffix === 'Month') fieldName = 'month';
    else if (fieldSuffix === 'IsPerpetual') fieldName = 'isPerpetual';
    
    return { isDynamic: true, solution, packageType, fieldName, fieldSuffix };
  };

  const updatePricingPackage = (solution, packageType, fieldName, value) => {
    setPricingPackages(prevPackages => ({
      ...prevPackages,
      [solution]: {
        ...prevPackages[solution],
        [packageType]: {
          ...prevPackages[solution][packageType],
          [fieldName]: value,
        },
      },
    }));
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const parsed = parseFieldName(name);
    
    // 1. Handle base form fields (teamId, paymentMethod, solutionType)
    if (!parsed.isDynamic) {
      let updatedForm = { ...form };
      if (name === 'solutionType') {
        updatedForm.solutionType = checked 
          ? [...updatedForm.solutionType, value] 
          : updatedForm.solutionType.filter(st => st !== value);
      } else {
        updatedForm[name] = type === "checkbox" ? checked : value;
      }
      setForm(updatedForm);
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // 2. Handle dynamic pricing package fields
    const { solution, packageType, fieldName, fieldSuffix } = parsed;
    const newValue = type === "checkbox" ? checked : value;
    
    // Start with a simple update
    let currentPackage = pricingPackages[solution][packageType];
    let updatedPackage = { ...currentPackage, [fieldName]: newValue };

    // --- Complex Logic for Plan/Perpetual ---

    // FIX START: Use static helper maps to infer dependent field names
    
    // a) Perpetual Toggle Logic
    if (fieldSuffix === 'IsPerpetual') {
        // No more destructuring from isPerpetualFields[name]!
        
        if (newValue === true) {
            updatedPackage.month = ""; 
            if (updatedPackage.plan === "One-Time") {
                updatedPackage.plan = "Yearly"; 
            }
        } else if (newValue === false) {
            updatedPackage.plan = "One-Time";
            updatedPackage.month = "0"; 
        }
    }

    // b) Plan Type Change Logic
    if (fieldSuffix === 'Plan') {
        // Changing the plan automatically turns OFF the perpetual flag
        updatedPackage.isPerpetual = false;

        if (["2 years", "3 years", "4 years", "5 years"].includes(newValue)) {
            updatedPackage.month = "1";
        } else if (newValue === "One-Time") {
            updatedPackage.month = "0";
        } else {
            // Monthly, Quarterly, Half Yearly, Yearly: reset duration to empty/dynamic
            updatedPackage.month = "";
        }
    }
    
    // FIX END

    // 3. Commit the package update
    setPricingPackages(prevPackages => ({
      ...prevPackages,
      [solution]: {
        ...prevPackages[solution],
        [packageType]: updatedPackage,
      },
    }));
    
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, [form, pricingPackages]);

  const handleNumberChange = useCallback((e) => {
    const { name, value } = e.target;
    const parsed = parseFieldName(name);

    // This only handles dynamic package amounts (hardwareAmount, etc.)
    if (parsed.isDynamic && parsed.fieldName === 'amount') {
        if (/^\d*$/.test(value)) {
            updatePricingPackage(parsed.solution, parsed.packageType, parsed.fieldName, value);
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    } else {
      // Fallback for month/duration fields
      if (/^\d*$/.test(value)) {
        const { solution, packageType, fieldName } = parsed;
        updatePricingPackage(solution, packageType, fieldName, value);
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  }, []);


  useEffect(() => {
    // Mock API calls - assuming axiosInstance is defined externally
    const fetchResources = async () => {
        try {
            const solutionRes = await axiosInstance.get("/packages/solution-types");
            setSolutionTypes((solutionRes.data || []).map((s) => s.sales_product));
        } catch (err) {
            console.error("Failed to fetch solution types", err);
        }

        try {
            const teamRes = await axiosInstance.get("/packages/teams");
            setTeams(teamRes.data || []);
        } catch (err) {
            console.error("Failed to fetch teams", err);
        }
    };
    fetchResources();
  }, []);

  const validateForm = () => {
    let validationErrors = {};
    let isValid = true;

    // 1. Base form validation
    if (form.solutionType.length === 0) {
      validationErrors.solutionType = "At least one Solution Type must be selected.";
      isValid = false;
    }
    if (!form.teamId) { validationErrors.teamId = "Team is required."; isValid = false; }
    if (!form.paymentMethod) { validationErrors.paymentMethod = "Payment Method is required."; isValid = false; }
    
    // 2. Dynamic package validation
    form.solutionType.forEach(solution => {
      const packages = pricingPackages[solution];
      const packageTypes = ['hardware', 'installation', 'subscription'];

      packageTypes.forEach(type => {
        const data = packages[type];
        const namePrefix = `${solution}_${type}`;

        // Validate Amount
        if (!data.amount || data.amount.trim() === "") {
          validationErrors[`${namePrefix}Amount`] = "Amount is required.";
          isValid = false;
        }

        // Validate Duration (Month), unless perpetual or one-time
        if (!data.isPerpetual && data.plan !== 'One-Time') {
          if (!data.month || Number(data.month) <= 0) {
            validationErrors[`${namePrefix}Month`] = "Duration is required.";
            isValid = false;
          }
        }
      });
    });

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) setShowPopup(true);
  };

  const handleConfirmYes = async () => {
  try {
    // Build the packages array from the dynamic state
    const packagesToSubmit = form.solutionType.map(solutionName => {
      const pkg = pricingPackages[solutionName];
      
      return {
        solutionType: solutionName,
        hardware: pkg.hardware.amount,
        hardwareGstIncluded: pkg.hardware.gstIncluded,
        hardwarePlan: pkg.hardware.plan,
        hardwareMonth: pkg.hardware.month,
        hardwareIsPerpetual: pkg.hardware.isPerpetual,
        installation: pkg.installation.amount,
        installationGstIncluded: pkg.installation.gstIncluded,
        installationPlan: pkg.installation.plan,
        installationMonth: pkg.installation.month,
        installationIsPerpetual: pkg.installation.isPerpetual,
        subscription: pkg.subscription.amount,
        subscriptionGstIncluded: pkg.subscription.gstIncluded,
        subscriptionPlan: pkg.subscription.plan,
        subscriptionMonth: pkg.subscription.month,
        subscriptionIsPerpetual: pkg.subscription.isPerpetual,
        hardware_next_bill_date: calculateNextBillDate(pkg.hardware.plan, pkg.hardware.month, pkg.hardware.isPerpetual),
        installation_next_bill_date: calculateNextBillDate(pkg.installation.plan, pkg.installation.month, pkg.installation.isPerpetual),
        subscription_next_bill_date: calculateNextBillDate(pkg.subscription.plan, pkg.subscription.month, pkg.subscription.isPerpetual),
      };
    });

    const payload = {
      clientId,
      billId,
      teamId: form.teamId,
      paymentMethod: form.paymentMethod,
      packages: packagesToSubmit,
    };

    await axiosInstance.post("/packages", payload);

    setShowPopup(false);
    onConfirm?.();
    navigate("/sales/display-billed");

  } catch (error) {
    console.error("Package submission failed:", error.response || error);
  }
};

  const handleConfirmNo = () => {
    setShowPopup(false);
    onConfirm?.();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
        <div className="max-w-6xl mx-auto">
            {/* Stepper (Simplified layout for context) */}
           <div className="flex items-center justify-center mb-8">
    {["Client Details", "Billing", "Package"].map((title, idx) => {
        const stepIndex = idx + 1; // 1, 2, 3
        const isCompleted = activeStep > idx; // Steps with index < activeStep (e.g., if activeStep is 2, step 0 and 1 are complete)
        const isCurrent = activeStep === idx; // The step with the current index (e.g., step 2)
        
        return (
            <React.Fragment key={idx}>
                <div className="flex items-center">
                    {/* Step Circle */}
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            isCurrent 
                                ? "bg-blue-600 text-white shadow-lg" // Current Step
                                : isCompleted 
                                ? "bg-blue-500 text-white" // Completed Step
                                : "bg-gray-200 text-gray-600" // Upcoming Step
                        }`}
                    >
                        {/* 🛑 CHANGE: Use a checkmark for completed steps */}
                        {isCompleted ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            stepIndex
                        )}
                        {/* 🛑 END OF CHANGE */}
                    </div>
                    
                    {/* Step Label */}
                    <span
                        className={`ml-2 text-sm hidden sm:block font-semibold transition-colors duration-300 ${
                            isCompleted || isCurrent 
                                ? "text-blue-600" 
                                : "text-gray-400"
                        }`}
                    >
                        {title}
                    </span>
                </div>
                
                {/* Connector Line */}
                {idx < 2 && (
                    <div
                        className={`w-12 sm:w-20 h-px mx-2 sm:mx-4 transition-colors duration-300 ${
                            isCompleted 
                                ? "bg-blue-600" 
                                : "bg-gray-300"
                        }`}
                    />
                )}
            </React.Fragment>
        );
    })}
</div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-xl">
          <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Select Package</h1>
          
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solution Type (Multi-Select) <span className="text-red-400">*</span>
              </label>
              {/* Checkbox Group */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 p-3 border border-gray-200 rounded-lg">
                {solutionTypes.length > 0 ? solutionTypes.map((d) => (
                    <label key={d} className="flex items-center text-sm font-medium text-gray-700 select-none cursor-pointer">
                        <input
                            type="checkbox"
                            name="solutionType"
                            value={d}
                            checked={form.solutionType.includes(d)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                        />
                        {d}
                    </label>
                )) : (
                    <p className="text-sm text-gray-400">Loading solution types...</p>
                )}
              </div>
              {errors.solutionType && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.solutionType}
                </p>
              )}
            </div>

            {/* Team */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team <span className="text-red-400">*</span>
              </label>
              <select
                name="teamId"
                value={form.teamId}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
              >
                <option value="">Select Team</option>
                {teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.team_name}
                  </option>
                ))}
              </select>
              {errors.teamId && (
                <p className="text-xs text-red-400 mt-1">{errors.teamId}</p>
              )}
            </div>
            
            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-6 pt-1">
                {paymentMethods.map((pm) => (
                  <label
                    key={pm}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm}
                      checked={form.paymentMethod === pm}
                      onChange={handleChange}
                      className="text-blue-500 w-4 h-4"
                    />
                    {pm}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>

          {/* Dynamic Package Components - REINSTATED */}
          {form.solutionType.map(solution => (
            <div key={solution} className="mb-6 pt-4 border-t border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 capitalize">
                {solution} Pricing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Hardware */}
                <PackageCard
                  title="Hardware"
                  solution={solution}
                  packageName="hardware"
                  data={pricingPackages[solution]?.hardware || initialPackageState}
                  plansArray={hardwarePlans}
                  errors={errors}
                  handleChange={handleChange}
                  handleNumberChange={handleNumberChange}
                />

                {/* Installation */}
                <PackageCard
                  title="Installation"
                  solution={solution}
                  packageName="installation"
                  data={pricingPackages[solution]?.installation || initialPackageState}
                  plansArray={genericPlans}
                  errors={errors}
                  handleChange={handleChange}
                  handleNumberChange={handleNumberChange}
                />

                {/* Subscription */}
                <PackageCard
                  title="Subscription"
                  solution={solution}
                  packageName="subscription"
                  data={pricingPackages[solution]?.subscription || initialPackageState}
                  plansArray={genericPlans}
                  errors={errors}
                  handleChange={handleChange}
                  handleNumberChange={handleNumberChange}
                />
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-center pt-4 border-t border-gray-100">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Submit Package Configuration
            </button>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  Confirm Package Configuration
                </h3>
                <div className="w-12 h-0.5 bg-blue-500 mx-auto"></div>
              </div>
              <div className="px-6 pb-2">
                <p className="text-gray-600 text-center leading-relaxed">
                  Are you ready to save this package configuration and proceed
                  to billing?
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 text-center">
                    This action will finalize your package setup.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleConfirmNo}
                    className="flex-1 px-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmYes}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPackage;