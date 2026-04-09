import { useState } from "react";
import apiClient from "../../../services/api-client";
import { useForm } from "react-hook-form";
import bgImg from "../../../assets/images/pattern-1.png";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Initialized to false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      await apiClient.post("/auth/users/reset_password/", data);
      setMessage("Success! Please check your email for the reset link.");
    } catch (error) {
      // Check if it's a 404 or 400 to provide better feedback
      const errorMsg =
        error.response?.status === 404
          ? "User with this email not found."
          : "Failed to send reset email. Please try again later.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Success/Error Alert */}
      {message && (
        <div
          role="alert"
          className={`alert ${message.includes("Success") ? "alert-success" : "alert-error"} w-11/12 max-w-md z-20 mb-4 transition-all`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Reset Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 shadow-2xl rounded-2xl w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 relative z-10 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
          <p className="text-gray-300 text-sm mt-2">
            Enter your email and we'll send you a link to get back into your
            account.
          </p>
        </div>

        <div className="form-control">
          <input
            type="email"
            placeholder="name@company.com"
            className={`input w-full bg-white text-black ${errors.email ? "border-red-500" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
          )}
        </div>

        <button
          className="btn border-none bg-gray-500 hover:bg-gray-600 text-white w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
