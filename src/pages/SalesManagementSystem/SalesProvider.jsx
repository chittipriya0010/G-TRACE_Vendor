import { useState } from "react";

function SalesProvider({ children }) {
  const [clientDetails, setClientDetails] = useState(null);
  const [billingInfo, setBillingInfo] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditingBill, setIsEditingBill] = useState(false);
  const [billingConfirmed, setBillingConfirmed] = useState(false);

  const handleClientDetailsSubmit = (data) => { setClientDetails(data); };
  const handleBillingSubmit = (data) => { setBillingInfo(data); };
  const handlePackageConfirm = () => { setBillingConfirmed(true); };
  const handleSelectCompany = (company) => { setSelectedCompany(company); };
  const handleEditBill = (company) => { setSelectedCompany(company); setIsEditingBill(true); };

  // Add other handlers similar to your flow

  return children({
    clientDetails,
    billingInfo,
    selectedCompany,
    isEditingBill,
    billingConfirmed,
    handleClientDetailsSubmit,
    handleBillingSubmit,
    handlePackageConfirm,
    handleSelectCompany,
    handleEditBill,
  });
}

export default SalesProvider;