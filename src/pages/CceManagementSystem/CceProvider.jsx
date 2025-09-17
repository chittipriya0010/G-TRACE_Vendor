import { useState } from "react";

function CceProvider({ children }) {
  const [jobRequest, setJobRequest] = useState(null);
  const [raiseService, setRaiseService] = useState(null);
  const [notWorking, setNotWorking] = useState(null);
  const [requisitionForm, setRequisitionForm] = useState(false);

  // Define handlers only if needed (example below)
  const handleJobRequest = (data) => setJobRequest(data);
  const handleRaiseService = (data) => setRaiseService(data);
  const handleNotWorking = (data) => setNotWorking(data);
  const handleRequisitionForm = (status) => setRequisitionForm(status);

  return children({
    jobRequest,
    raiseService,
    notWorking,
    requisitionForm,
    handleJobRequest,
    handleRaiseService,
    handleNotWorking,
    handleRequisitionForm,
  });
}

export default CceProvider;