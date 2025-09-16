import { useParams, useNavigate } from "react-router-dom";

const gstRate = 0.18;

const sampleRequests = [
  {
    id: 1,
    orderDate: "10 Jan, 2025",
    status: "Pending at Admin",
    products: [
      { vendor: "Dashmesh 1051", name: "Cutting Blade", unit: "pcs", qty: 50, rate: 10 },
      { vendor: "Dashmesh 1051", name: "Wrinch 14*15", unit: "pcs", qty: 10, rate: 40 },
      { vendor: "Dashmesh 1051", name: "Wrinch 14*15", unit: "pcs", qty: 10, rate: 40 },
      { vendor: "Dashmesh 1051", name: "Wrinch 14*15", unit: "pcs", qty: 10, rate: 40 },
    ],
  },
];

const StockDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(requestId, 10);

  const request = sampleRequests.find((r) => r.id === id);
  if (!request) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-gray-600">Request not found.</p>
          <button
            onClick={() => navigate("/stocks/requested")}
            className="mt-4 bg-cyan-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-cyan-900"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = request.products.reduce(
    (sum, p) => sum + p.qty * p.rate * (1 + gstRate),
    0
  );

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Stock Details - Order #{request.id}</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-800 text-white px-4 py-3 flex justify-between items-center">
          <span className="font-medium">Product Details</span>
          <button
            onClick={() => navigate("/stocks/requested")}
            className="btn-secondary"
          >
            Back to Requests
          </button>
        </div>

        {/* Products Header */}
        <div className="px-4 py-3 bg-gray-100 border-b">
          <div className="grid grid-cols-8 gap-4 text-sm text-center font-medium text-gray-600">
            <div>Vendor</div>
            <div>Product Name</div>
            <div>Unit</div>
            <div>Qty</div>
            <div>Rate</div>
            <div>Amount</div>
            <div>Amount w/ GST</div>
            <div>Status</div>
          </div>
        </div>

        {/* Products List */}
        <div className="overflow-x-auto">
          {request.products.map((p, idx) => {
            const amount = p.qty * p.rate;
            const gstAmount = amount * (1 + gstRate);
            return (
              <div
                key={idx}
                className="grid grid-cols-8 gap-4 px-4 py-3 text-sm text-center text-gray-900 border-b hover:bg-gray-50"
              >
                <div>{p.vendor}</div>
                <div>{p.name}</div>
                <div>{p.unit}</div>
                <div>{p.qty}</div>
                <div>₹ {p.rate}</div>
                <div>₹ {amount}</div>
                <div>₹ {gstAmount}</div>
                <div className="px-2 py-1 text-xs font-medium rounded bg-orange-100 text-orange-700">{request.status}</div>
              </div>
            );
          })}
          {request.products.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              No products found in this request.
            </div>
          )}
        </div>
        {/* Order Summary */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex flec justify-end items-center gap-4 text-sm">
              <div className="font-medium text-gray-600">Total Amount</div>
              <div className="px-4 py-2 border-0 rounded-md bg-blue-100 font-bold text-cyan-800">₹ {totalAmount}</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StockDetails;
