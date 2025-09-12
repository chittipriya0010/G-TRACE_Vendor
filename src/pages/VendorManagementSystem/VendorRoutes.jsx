import { Routes, Route } from "react-router-dom";

import VendorDetails from "../../components/Vendor/VendorDetails";
import AddVendor from "../../components/Vendor/AddVendor";
import { useState } from "react";
import VendorList from "../../components/Vendor/VendorList";


const VendorRoutes = () => {

  const [vendors, setVendors] = useState([
      {
        id: 1,
        name: 'Dashmesh',
        phone: '9943225422',
        address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
        gstNo: '29AAACCD040J2M',
        panNo: 'AAACCD040J',
        accountNo: 'Amar Kapila',
        totalProducts: 6,
        products: [
          { id: 1, name: 'Cutting Blade', rate: 16, unit: 'Pcs' },
          { id: 2, name: 'Wrench 14*15', rate: 50, unit: 'Pcs' },
          { id: 3, name: 'Wrench 16*17', rate: 20, unit: 'Pcs' },
          { id: 4, name: 'Solenoid', rate: 40, unit: 'Pcs' },
          { id: 5, name: 'Iron Wire', rate: 156, unit: 'Bundle' },
          { id: 6, name: 'DC Pin', rate: 200, unit: 'Bundle' }
        ]
      },
      {
        id: 2,
        name: 'Pooja',
        phone: '9943225422',
        address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
        gstNo: '29AAACCD040J2M',
        panNo: 'AAACCD040J',
        accountNo: 'Amar Kapila',
        totalProducts: 30,
        products: []
      },
      {
        id: 3,
        name: 'Amar',
        phone: '9943225422',
        address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
        gstNo: '29AAACCD040J2M',
        panNo: 'AAACCD040J',
        accountNo: 'Amar Kapila',
        totalProducts: 10,
        products: []
      },
      {
        id: 4,
        name: 'Suraj',
        phone: '9943225422',
        address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
        gstNo: '29AAACCD040J2M',
        panNo: 'AAACCD040J',
        accountNo: 'Amar Kapila',
        totalProducts: 9,
        products: []
      },
      {
        id: 5,
        name: 'Amar',
        phone: '9943225422',
        address: '2, Nehru Ramakrishna Building, Trinity Circle, M.G Road, 560006',
        gstNo: '29AAACCD040J2M',
        panNo: 'AAACCD040J',
        accountNo: 'Amar Kapila',
        totalProducts: 20,
        products: []
      }
    ]);
    const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  

  return (
   <Routes>
      <Route 
        index 
        element={
          <VendorList 
            vendors={vendors}
            setSelectedVendor={setSelectedVendor}
            setShowAddProductModal={setShowAddProductModal}
          />
        } 
      />
      <Route path="add" element={<AddVendor />} />
      <Route path=":vendorId" element={<VendorDetails />} />
    </Routes>
  );
};

export default VendorRoutes;
