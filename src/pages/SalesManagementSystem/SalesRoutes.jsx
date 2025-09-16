import SalesProvider from "./SalesProvider";
import NewAccountCreation from "../../components/Sales/NewAccountCreation";
import BillingInformation from "../../components/Sales/BillingInformation";
import SelectPackage from "../../components/Sales/SelectPackage";
import DisplayBilledInformation from "../../components/Sales/DisplayBilledInformation";
import DetailedClient from "../../components/Sales/DetailedClient";
import EditBill from "../../components/Sales/EditBill";
import Dashboard from "../../components/Sales/Dashboard";
import DeactivateAccount from "../../components/Sales/DeactivateAccount";

const SalesRoutes = [
  {
    index: true,
    element: <Dashboard />,  // Dashboard at /sales
  },
  {
    path: "new-account",  // new path for new account creation
    element: (
      <SalesProvider>
        {({ handleClientDetailsSubmit }) => (
          <NewAccountCreation onNext={handleClientDetailsSubmit} activeStep={0} />
        )}
      </SalesProvider>
    ),
  },
  {
    path: "billing",
    element: (
      <SalesProvider>
        {({ clientDetails, handleBillingSubmit }) => (
          <BillingInformation
            clientDetails={clientDetails}
            onNext={handleBillingSubmit}
            activeStep={1}
          />
        )}
      </SalesProvider>
    ),
  },
  {
    path: "select-package",
    element: (
      <SalesProvider>
        {({ clientDetails, billingInfo, handlePackageConfirm }) => (
          <SelectPackage
            clientDetails={clientDetails}
            billingInfo={billingInfo}
            onConfirm={handlePackageConfirm}
            activeStep={2}
          />
        )}
      </SalesProvider>
    ),
  },
  {
    path: "display-billed",
    element: (
      <SalesProvider>
        {({ handleSelectCompany, handleEditBill }) => (
          <DisplayBilledInformation
            onSelectCompany={handleSelectCompany}
            onEditCompany={handleEditBill}
          />
        )}
      </SalesProvider>
    ),
  },
  {
    path: "detailed-client",
    element: (
      <SalesProvider>
        {({ selectedCompany }) => <DetailedClient company={selectedCompany} />}
      </SalesProvider>
    ),
  },
  {
    path: "edit-bill",
    element: (
      <SalesProvider>
        {({ selectedCompany }) => <EditBill company={selectedCompany} />}
      </SalesProvider>
    ),
  },
  {
  path: "settings",
  element: <DeactivateAccount activeStep={0} />,
},
];

export default SalesRoutes;