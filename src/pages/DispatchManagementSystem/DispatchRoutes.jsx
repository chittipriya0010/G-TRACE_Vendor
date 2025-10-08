import InstallAssignEngineer from "../../components/Dispatch/InstallAssignEngineer";
import ServiceAssignEngineer from "../../components/Dispatch/ServiceAssignEngineer";
import DispatchProvider from "./DispatchProvider";

const DispatchRoutes = [
  {
    path: "service-assign-engineer",  // new path for new account creation
    element: (
      <DispatchProvider>
        {() => <ServiceAssignEngineer />}
      </DispatchProvider>
    ),
  },
  {
    path: "install-assign-engineer",  // new path for new account creation
    element: (
      <DispatchProvider>
        {() => <InstallAssignEngineer />}
      </DispatchProvider>
    ),
  },
];

  export default DispatchRoutes;