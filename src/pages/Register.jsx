import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/images/cat1.jpg";
import useAuthContext from "../hooks/useAuthContext";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register = () => {
  const { registerUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMas] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  useEffect(() => {
    setTimeout(() => {
      setSuccessMsg("");
      setFailedMas("");
    }, 4000);
  }, [successMsg, failedMsg]);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const response = await registerUser(data);
      if (response?.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setFailedMas(response.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white ${
      error
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-orange-500"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Simple Toast */}
      {successMsg && (
        <div className="fixed top-6 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
          {successMsg}
        </div>
      )}
      {failedMsg && (
        <div className="fixed top-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
          {failedMsg}
        </div>
      )}

      <div className="bg-white w-full max-w-4xl rounded-4xl shadow-2xl shadow-slate-200/50 flex overflow-hidden text-slate-600">
        {/* Left Side Visual */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src={img}
            alt="Side"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-teal-900/70 to-transparent flex flex-col justify-end p-12">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20">
              <h2 className="text-white text-3xl font-bold tracking-tight">
                Join Us
              </h2>
              <p className="text-teal-50/90 mt-2 font-medium">
                Create an account and start your journey today.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400 mt-2">Join us today to get started.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-600 ml-1 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className={inputClass(errors.email)}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-600 ml-1 mb-2 block">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClass(errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                  validate: {
                    hasUpper: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must include at least one uppercase letter",
                    hasLower: (value) =>
                      /[a-z]/.test(value) ||
                      "Must include at least one lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include at least one number",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-600 ml-1 mb-2 block">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClass(errors.re_password)}
                {...register("re_password", {
                  required: "Please confirm password",
                  validate: (val) =>
                    val === password || "Passwords don't match",
                })}
              />
              {errors.re_password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.re_password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 py-1">
              <span className="text-sm text-slate-500">Show Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-yellow-600 mx-1"
              >
                {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-white text-white hover:text-gray-700 border-2 border-orange-500 font-bold py-3.5 rounded-xl shadow-lg shadow-gray-300 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Please wait..." : "Register Now"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
