import { useState } from "react";

function DispatchProvider({ children }) {
  const [assignEngineer, setAssignEngineer] = useState(null);

  // Define handlers only if needed (example below)
  const handleAssignEngineer = (data) => setAssignEngineer(data);

  return children({
    handleAssignEngineer,
  });
}

export default DispatchProvider;