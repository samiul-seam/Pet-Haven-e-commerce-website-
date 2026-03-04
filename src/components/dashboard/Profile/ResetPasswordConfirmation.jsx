import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import apiClient from "../../../services/api-client";
import { useForm } from "react-hook-form";

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
    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: data.new_password,
      });
      setMessage("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-emerald-200">
      <div className="shadow-gray-400 bg-teal-500 shadow-2xl p-2 rounded-2xl ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl bg-teal-600 p-3"
        >
          {/* New Password */}
          <div className="form-control">
            <label className="label">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full"
              {...register("new_password", {
                required: "New Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            {errors.new_password && (
              <p className="text-red-500 text-sm">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-control">
            <label className="label">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full"
              {...register("confirm_new_password", {
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
            />
            {errors.confirm_new_password && (
              <p className="text-red-500 text-sm">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {/* Show Password */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Show Password</span>
              <input
                type="checkbox"
                className="toggle"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          </div>

          <button type="submit" className="btn bg-teal-500 w-full">
            {loading ? "Reseting.." : "Reset password"}
          </button>

          {message && <p className="text-green-500 mt-2">{message}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmation;
