import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../../services/api-client";
import { useForm } from "react-hook-form";
import bgImg from "../../../assets/images/pattern-1.png";

const ResetPasswordConfirmation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password,
        re_new_password: data.confirm_new_password, // Many backends require both
      });
      
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Improved error extraction
      const serverError = err.response?.data;
      setError(serverError?.detail || serverError?.non_field_errors?.[0] || "Something went wrong");
    } finally {
      setLoading(false); // Ensure loading stops regardless of outcome
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img src={bgImg} alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Form Card */}
      <div className="z-10 w-full max-w-md p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Reset Your Password</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="form-control">
              <label className="label text-white">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full bg-white/10 text-white placeholder-gray-300 ${errors.new_password ? 'border-red-600' : ''}`}
                {...register("new_password", {
                  required: "New Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                })}
              />
              {errors.new_password && (
                <p className="text-red-600 text-xs mt-1">{errors.new_password.message}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="form-control">
              <label className="label text-white">Confirm New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full bg-white/10 text-white ${errors.confirm_new_password ? 'border-red-500' : ''}`}
                {...register("confirm_new_password", {
                  validate: (value) =>
                    value === watch("new_password") || "Passwords do not match",
                })}
              />
              {errors.confirm_new_password && (
                <p className="text-red-600 text-xs mt-1">{errors.confirm_new_password.message}</p>
              )}
            </div>

            {/* Show Password Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="label-text text-white">Show Passwords</span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn border-none bg-gray-500 hover:bg-gray-600 text-white w-full mt-4"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Update Password"}
            </button>

            {message && (
              <div className="alert alert-success py-2 mt-4 text-sm">
                {message}
              </div>
            )}
            
            {error && (
              <div className="alert alert-error py-2 mt-4 text-sm text-white">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;