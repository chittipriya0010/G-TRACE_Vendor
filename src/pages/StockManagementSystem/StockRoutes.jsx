import { useState } from "react";
import PurchaseEntry from "../../components/Stocks/PurchaseEntry";
import RequestedStock from "../../components/Stocks/RequestedStock";
import StockDetails from "../../components/Stocks/StockDetails";

function StockProvider({ children }) {

  const sampleVendors = [
    {
      id: "v1",
      name: "Steel Traders",
      products: [
        { id: "p1", name: "Steel Rod", rate: 120, unit: "Kg", minOrderQty: 50 },
        { id: "p2", name: "Iron Sheet", rate: 250, unit: "Sheet", minOrderQty: 10 },
      ],
    },
    {
      id: "v2",
      name: "Electricals Hub",
      products: [
        { id: "p3", name: "Motor", rate: 5000, unit: "Pcs", minOrderQty: 2 },
        { id: "p4", name: "Solenoid Coil", rate: 1200, unit: "Pcs", minOrderQty: 5 },
      ],
    },
    {
      id: "v3",
      name: "Furniture Hub",
      products: [
        { id: "p5", name: "Wooden Chair", rate: 1500, unit: "Pcs", minOrderQty: 4 },
        { id: "p6", name: "Office Table", rate: 3200, unit: "Pcs", minOrderQty: 2 },
      ],
    },
  ];


  const [vendors, setVendors] = useState(sampleVendors);
  const [requests, setRequests] = useState([{
        id: 1,
        orderDate: "10 Jan, 2025",
        productOrder: 4,
        qtyTaken: 4,
        totalAmount: 14200,
        status: "Pending at Admin",
        products: [
            { name: "Steel Rod", units: 2, rate: 1500 },
            { name: "Cement Bag", units: 2, rate: 5000 },
        ],
    },
    {
        id: 2,
        orderDate: "11 Jan, 2025",
        productOrder: 15,
        qtyTaken: 15,
        totalAmount: 16000,
        status: "Pending at Account",
        products: [
            { name: "Bricks", units: 10, rate: 800 },
            { name: "Sand", units: 5, rate: 800 },
        ],
    },
    {
        id: 3,
        orderDate: "12 Jan, 2025",
        productOrder: 8,
        qtyTaken: 8,
        totalAmount: 2000,
        status: "Pending at Account",
        products: [
            { name: "Paint Bucket", units: 4, rate: 200 },
            { name: "Brush Set", units: 4, rate: 300 },
        ],
    },
    {
        id: 4,
        orderDate: "12 Jan, 2025",
        productOrder: 8,
        qtyTaken: 8,
        totalAmount: 2000,
        status: "Pending at Account",
        products: [
            { name: "Tiles", units: 8, rate: 250 },
        ],
    },]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // ---- Function to add new stock request ----
  const addRequest = (requestData) => {
    setRequests((prev) => [
      ...prev,
      { id: prev.length + 1, orderDate: new Date().toLocaleDateString(), ...requestData },
    ]);
  };

  return (
    <>
      {children({
        vendors,
    setVendors,
    requests,
    setRequests,
    addRequest,
    isLoading,
    isError,
    selectedVendor,
    setSelectedVendor,
      })}
    </>
  );
}

// ---- Define routes as an array ----
const StockRoutes = [
  {
    index: true,
    element: (
      <StockProvider>
        {({ vendors, isLoading, isError, addRequest }) => (
          <PurchaseEntry
            vendors={vendors}
            isLoading={isLoading}
            isError={isError}
            addRequest={addRequest}
          />
        )}
      </StockProvider>
    ),
  },
  {
    path: "requested",
    element: (
      <StockProvider>
        {({ requests }) => <RequestedStock requests={requests} />}
      </StockProvider>
    ),
  },
  {
    path: "stock-details/:requestId",
    element: (
      <StockProvider>
        {({ requests }) => <StockDetails requests={requests} />}
      </StockProvider>
    ),
  },
];

export default StockRoutes;
