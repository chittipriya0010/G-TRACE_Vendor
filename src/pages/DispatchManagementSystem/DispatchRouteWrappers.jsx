// src/pages/DispatchManagementSystem/DispatchRouteWrappers.jsx - FIX THIS FILE
import DispatchProvider from "./DispatchProvider";
import ServiceAssignEngineer from "../../components/Dispatch/ServiceAssignEngineer";
import InstallAssignEngineer from "../../components/Dispatch/InstallAssignEngineer";

// Wrappers - Use a function as children (render prop pattern)
export const ServiceAssignEngineerWrapper = () => (
  <DispatchProvider>
    {({ /* deconstruct props here if needed, e.g., handleAssignEngineer */ }) => (
      <ServiceAssignEngineer /> // The element returned by the function
    )}
  </DispatchProvider>
);

export const InstallAssignEngineerWrapper = () => (
  <DispatchProvider>
    {({ /* deconstruct props here if needed */ }) => (
      <InstallAssignEngineer />
    )}
  </DispatchProvider>
);