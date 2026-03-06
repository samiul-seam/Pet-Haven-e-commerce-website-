import { useState } from "react";
import apiClient from "../../../services/api-client";
import { useForm } from "react-hook-form";

const ResetPassword = () => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();

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
      setMessage("Activation email sent successfully.");
      console.log(data);
    } catch (error) {
      setMessage("Failed to send activation email.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-200">
      {message && (
        <div role="alert" className="alert alert-success w-1/2">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 shadow-md rounded-lg w-96 space-y-4 bg-teal-600"
      >
        <label className="text-xl font-semibold text-center">
          Reset Your password
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="input input-bordered w-full mt-3 bg-cyan-100 text-black"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
        <button className="btn bg-teal-500 w-full" disabled={loading}>
          {loading ? "Sending Email..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
