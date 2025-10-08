import CceProvider from "./CceProvider";
import NotWorkingVehicle from "../../components/Cce/NotWorking";
import RaiseService from "../../components/Cce/RaiseService";
import ViewJob from "../../components/Cce/ViewJob";
import DeletionList from "../../components/Cce/DeletionList";
import NewDeviceAdditionList from "../../components/Cce/NewVehicleAdditionList";
import RequisitionForm from "../../components/Cce/RequisitionForm";
import ViewStockRequest from "../../components/Cce/ViewRequestStock";
import DisplayBilledInformation from "../../components/Sales/DisplayBilledInformation";
import RaisedServiceRequests from "../../components/Cce/RaisedServiceRequests";
import ViewInstallationRequest from "../../components/Cce/ViewInstallationRequest";
import InstallationAdmin from "../../components/Cce/InstallationAdmin";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";

// Define Role Constants
const GENERAL_CCE_ROLES = ["CCE", "cceAdmin"]; 
const CCE_ADMIN_ONLY_ROLE = ["cceAdmin"];
const CCE_ONLY_ROLE = ["CCE"]; // The standard CCE user role

// 🛠️ FIX 1: Corrected ProtectedCceElement for Render Props pattern
/**
 * Helper component to simplify CCE route definition.
 * It ensures the route is Protected and the component receives context 
 * via CceProvider's Render Prop.
 *
 * It accepts the COMPONENT (not children) and renders it within the CceProvider's render function.
 */
const ProtectedCceElement = ({ Component, allowedRoles = GENERAL_CCE_ROLES }) => (
    <ProtectedRoute allowedRoles={allowedRoles}> 
        <CceProvider>
            {/* The child of CceProvider must be a function (Render Prop) */}
            {(context) => <Component {...context} />}
        </CceProvider>
    </ProtectedRoute>
);

const CceRoutes = [
    // 1. CCE-ONLY Routes (Standard CCE tasks - Not visible to cceAdmin)
    // 🛠️ FIX 2: Set allowedRoles to CCE_ONLY_ROLE and use the corrected ProtectedCceElement helper
    {
        path: "not-working",
        element: <ProtectedCceElement Component={NotWorkingVehicle} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "raise-service",
        element: <ProtectedCceElement Component={RaiseService} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "view-job",
        element: <ProtectedCceElement Component={ViewJob} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "deletion-list",
        element: <ProtectedCceElement Component={DeletionList} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "new-addition",
        element: <ProtectedCceElement Component={NewDeviceAdditionList} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "requisition-form",
        // This component doesn't use CceProvider context, so just wrap with ProtectedRoute
        element: <ProtectedRoute allowedRoles={CCE_ONLY_ROLE}><RequisitionForm /></ProtectedRoute>,
    },
    {
        path: "view-request-stock",
        // This component clearly uses context, so use the helper or inline CceProvider
        element: <ProtectedCceElement Component={ViewStockRequest} allowedRoles={CCE_ONLY_ROLE} />,
    },
    {
        path: "view-install-request",
        element: <ProtectedRoute allowedRoles={CCE_ONLY_ROLE}><ViewInstallationRequest /></ProtectedRoute>,
    },

    // 2. Routes Accessible by Both CCE and cceAdmin (Admin might need to see all requests)
    {
        // Keeping this open for both roles as it's often useful for admin to monitor requests
        path: "raised-service-requests",
        element: <ProtectedRoute allowedRoles={GENERAL_CCE_ROLES}><RaisedServiceRequests /></ProtectedRoute>,
    },
    {
        // Keeping this open for both roles for consistency with Sales (if applicable)
        path: "display-billed",
        element: <ProtectedRoute allowedRoles={GENERAL_CCE_ROLES}><DisplayBilledInformation /></ProtectedRoute>,
    },

    // 3. Admin Portal - Restrict to CCE Admin ONLY
    {
        path: "install-admin",
        element: (
            <ProtectedRoute allowedRoles={CCE_ADMIN_ONLY_ROLE}> 
                <InstallationAdmin />
            </ProtectedRoute>
        ),
    },
];

export default CceRoutes;