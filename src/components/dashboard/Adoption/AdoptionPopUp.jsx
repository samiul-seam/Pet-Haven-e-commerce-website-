import { useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../../../services/auth-api-client";
import { useNavigate } from "react-router";

const AdoptionPopUp = ({ isOpen, onClose, petId }) => {
  const [error, setError] = useState(null);
  const [payLoading, setPayLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const onPayNow = async (data) => {
    setError(null);
    setPayLoading(true);
    try {
      const adoptionData = {
        ...data,
        pet_id: petId,
      };
      const res = await authApiClient.post("/adoptions/", adoptionData);
      if (res.status === 201) {
        setTimeout(() => {
          alert("Pet added to adoption list. Navigating to adoption list");
          navigate("/dashboard/adoption")
          onClose();
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.pet_id);
    } finally {
      setPayLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError(null);
    setAddLoading(true);
    try {
      data = { ...data, pet_id: petId };
      await authApiClient.post("/adoptions/", data);
      alert("Pet added successfully");
    } catch (error) {
      setError(error.response?.data?.pet_id);
    } finally {
      setAddLoading(false);
    }
  };

  const inputClass = (Error) =>
    `w-full border p-2.5 rounded-lg focus:ring-2 outline-none transition-all text-slate-600 ${
      Error
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:ring-blue-200"
    }`;

  return (
    <div className="fixed inset-0 bg-slate-700/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white text-xl font-bold z-10"
        >
          ✕
        </button>

        {/* Header Section */}
        <div className="bg-teal-800/90 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Complete Adoption</h2>
          <p className="text-slate-300 text-sm mt-1">
            Provide your details to finalize the process.
          </p>
        </div>

        <form onSubmit={handleSubmit(onPayNow)} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className={inputClass(errors.name)}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Shipping Address
            </label>
            <textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Please provide a full address",
                },
              })}
              className={inputClass(errors.address)}
              placeholder="Street, Area, City"
              rows="3"
            />
            {errors.address && (
              <span className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              {...register("phone_number", {
                required: "Phone number is required",
                pattern: {
                  message: "Invalid phone number",
                },
              })}
              className={inputClass(errors.phone_number)}
              placeholder="+8801234567890"
            />
            {errors.phone_number && (
              <span className="text-red-500 text-xs mt-1">
                {errors.phone_number.message}
              </span>
            )}
          </div>

          {/* Footer Actions */}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={payLoading}
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:bg-blue-400 "
            >
              {payLoading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                "Pay Now"
              )}
            </button>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={addLoading}
              className="flex-1 px-4 py-3 text-sm font-bold text-white bg-teal-700 rounded-xl hover:bg-teal-600 transition-colors "
            >
              {addLoading ? "Adding..." : "Add to AdoptList"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionPopUp;
