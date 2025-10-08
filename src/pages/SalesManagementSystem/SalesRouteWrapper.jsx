// src/pages/SalesManagementSystem/SalesRouteWrappers.jsx
import SalesProvider from "./SalesProvider";
import NewAccountCreation from "../../components/Sales/NewAccountCreation";
import BillingInformation from "../../components/Sales/BillingInformation";
import SelectPackage from "../../components/Sales/SelectPackage";
import DisplayBilledInformation from "../../components/Sales/DisplayBilledInformation";
import DetailedClient from "../../components/Sales/DetailedClient";
import EditBill from "../../components/Sales/EditBill";

export const NewAccountWrapper = () => (
  <SalesProvider>
    {({ handleClientDetailsSubmit }) => (
      <NewAccountCreation onNext={handleClientDetailsSubmit} activeStep={0} />
    )}
  </SalesProvider>
);

export const BillingWrapper = () => (
  <SalesProvider>
    {({ clientDetails, handleBillingSubmit }) => (
      <BillingInformation
        clientDetails={clientDetails}
        onNext={handleBillingSubmit}
        activeStep={1}
      />
    )}
  </SalesProvider>
);

export const SelectPackageWrapper = () => (
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
);

export const DisplayBilledWrapper = () => (
  <SalesProvider>
    {({ handleSelectCompany, handleEditBill }) => (
      <DisplayBilledInformation
        onSelectCompany={handleSelectCompany}
        onEditCompany={handleEditBill}
      />
    )}
  </SalesProvider>
);

export const DetailedClientWrapper = () => (
  <SalesProvider>
    {({ selectedCompany }) => <DetailedClient company={selectedCompany} />}
  </SalesProvider>
);

export const EditBillWrapper = () => (
  <SalesProvider>
    {({ selectedCompany }) => <EditBill company={selectedCompany} />}
  </SalesProvider>
);