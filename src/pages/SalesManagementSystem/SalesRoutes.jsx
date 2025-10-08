import SalesProvider from "./SalesProvider";
import NewAccountCreation from "../../components/Sales/NewAccountCreation";
import BillingInformation from "../../components/Sales/BillingInformation";
import SelectPackage from "../../components/Sales/SelectPackage";
import DisplayBilledInformation from "../../components/Sales/DisplayBilledInformation";
import EditBill from "../../components/Sales/EditBill";
import Dashboard from "../../components/Sales/Dashboard";
import DeactivateAccount from "../../components/Sales/DeactivateAccount";
import AdminPackages from "../../components/Sales/SalesAdmin";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";

// Use the exact roles from your database: "Sales" and "salesAdmin"
const GENERAL_SALES_ROLES = ["Sales", "salesAdmin"];
// Define a constant for the Sales-Only role for clarity
const SALES_ONLY_ROLE = ["Sales"]; 

/**
 * Helper component to wrap SalesProvider and ProtectedRoute, 
 * reducing boilerplate for common sales routes that both roles can access.
 */
const ProtectedSalesElement = ({ children }) => (
    // Protect this route for both Sales and Admin
    <ProtectedRoute allowedRoles={GENERAL_SALES_ROLES}> 
        <SalesProvider>
            {children}
        </SalesProvider>
    </ProtectedRoute>
);

const SalesRoutes = [
    // 1. Dashboard (Index route: /sales) - Both Roles
    {
        index: true,
        element: (
            <ProtectedRoute allowedRoles={GENERAL_SALES_ROLES}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },

    // 2. New Account, Billing, Select Package, Edit Bill - Both Roles (Uses helper)
    {
        path: "new-account",
        element: (
            <ProtectedSalesElement>
                {({ handleClientDetailsSubmit }) => (
                    <NewAccountCreation onNext={handleClientDetailsSubmit} activeStep={0} />
                )}
            </ProtectedSalesElement>
        ),
    },
    {
        path: "billing",
        element: (
            <ProtectedSalesElement>
                {({ clientDetails, handleBillingSubmit }) => (
                    <BillingInformation
                        clientDetails={clientDetails}
                        onNext={handleBillingSubmit}
                        activeStep={1}
                    />
                )}
            </ProtectedSalesElement>
        ),
    },
    {
        path: "select-package",
        element: (
            <ProtectedSalesElement>
                {({ clientDetails, billingInfo, handlePackageConfirm }) => (
                    <SelectPackage
                        clientDetails={clientDetails}
                        billingInfo={billingInfo}
                        onConfirm={handlePackageConfirm}
                        activeStep={2}
                    />
                )}
            </ProtectedSalesElement>
        ),
    },
    {
        path: "edit-bill",
        element: (
            <ProtectedSalesElement>
                {({ selectedCompany }) => <EditBill company={selectedCompany} />}
            </ProtectedSalesElement>
        ),
    },

    // 🎯 FIX APPLIED HERE: Restrict to Sales Only.
    {
        path: "display-billed",
        element: (
            <ProtectedRoute allowedRoles={SALES_ONLY_ROLE}> {/* <<< Custom Strict Protection */}
                <SalesProvider>
                    {({ handleSelectCompany, handleEditBill }) => (
                        <DisplayBilledInformation
                            onSelectCompany={handleSelectCompany}
                            onEditCompany={handleEditBill}
                        />
                    )}
                </SalesProvider>
            </ProtectedRoute>
        ),
    },

    // 3. Settings - Both Roles
    {
        path: "settings",
        element: (
            <ProtectedRoute allowedRoles={GENERAL_SALES_ROLES}>
                <DeactivateAccount activeStep={0} />
            </ProtectedRoute>
        ),
    },

    // 4. Admin Sales - Admin Only
    {
        path: "admin-sales",
        element: (
            <ProtectedRoute
                allowedRoles={["salesAdmin"]} // Only salesAdmin should see this
                allowedPermissions={["admin"]}
            >
                <AdminPackages />
            </ProtectedRoute>
        ),
    },
];

export default SalesRoutes;