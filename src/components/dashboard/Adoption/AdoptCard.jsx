import authApiClient from "../../../services/auth-api-client";
import AdoptItem from "./AdoptItem";
import { useEffect, useState } from "react";

const AdoptCard = ({ adopt, user, onCancel }) => {
  const [status, setStatus] = useState(adopt.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(adopt.status);
  }, [adopt.status]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    if (newStatus === status) return;

    try {
      setLoading(true);
      const response = await authApiClient.patch(
        `/adoptions/${adopt.id}/update_status/`,
        { status: newStatus },
      );
      if (response.status === 200) {
        setStatus(newStatus);
        alert("Adoption status changed successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice =
    adopt?.pets?.reduce((total, item) => total + (item.price || 0), 0) || 0;

  const tax = totalPrice.toFixed(20) * 0.02;
  const payablePrice = (totalPrice + tax).toFixed(2);

  // payment
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/payment/initiate/", {
        amount: payablePrice,
        AdoptId: adopt.id,
      });
      if (response.data.payment_url) {
        setLoading(false);
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusColor = {
    "Not Paid": "bg-red-500",
    "Paid": "bg-green-500",
    "Ready To Adopt": "bg-blue-500",
    "Adopted": "bg-teal-600",
    "Canceled": "bg-gray-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-semibold text-slate-600">
          Adoption Details
        </h2>

        {user?.is_staff ? (
          <select
            value={status}
            disabled={loading}
            onChange={handleStatusChange}
            className="px-3 py-1 rounded-full text-white text-sm font-medium bg-teal-700"
          >
            {loading ? (
              <>
                <option>Changing...</option>
              </>
            ) : (
              <>
                <option value="Not Paid">Not Paid</option>
                <option value="Paid">Paid</option>
                <option value="Processing">Processing</option>
                <option value="Ready To Adopt">Ready To Adopt</option>
                <option value="Adopted">Adopted</option>
                <option value="Canceled">Canceled</option>
              </>
            )}
          </select>
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
              statusColor[status] || "bg-gray-400"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      <AdoptItem adopt={adopt} />

      {/* Price */}
      <div>
        <div className="border-t pt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-slate-700">Total Price</p>

          <p className="text-xl font-bold text-teal-700">
            ৳ {totalPrice.toFixed(2)}
          </p>
        </div>
        <span className="flex justify-between items-center mt-1">
          <p className="text-slate-700">Delivery Charge</p>
          <p className="text-teal-700">Free</p>
        </span>
        <span className="flex justify-between items-center mt-1">
          <p className="text-slate-700">Tax</p>
          <p className="text-teal-700">{tax}</p>
        </span>
        <span className="border-t border-teal-950 flex justify-between items-center mt-1">
          <p className="text-teal-900 font-bold text-xl">Payable Price</p>
          <p className=" text-teal-700">{payablePrice}</p>
        </span>
      </div>

      {/* Action */}
      {!user.is_staff && status === "Not Paid" && (
        <div className="flex gap-4">
          <button
            onClick={handlePayment}
            className="btn flex-1 bg-orange-400 hover:shadow-none text-white"
          >
            Buy Now
          </button>
          <button
            onClick={() => onCancel(adopt.id)}
            className="btn btn-outline btn-error"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AdoptCard;
