import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import img from "../assets/images/cat2.jpg";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { errorMsg, loginUser } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success) {
        setTimeout(() => {
          navigate("/dashboard");
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
      error
        ? "border-red-400 focus:border-red-500"
        : "border-slate-300 focus:border-teal-500"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      {errorMsg && (
        <div className="fixed top-6 z-50 animate-bounce">
          <ErrorAlert error={errorMsg} />
        </div>
      )}

      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row min-h-150 text-slate-600">
        {/* Left Side Visual */}
        <div className="relative w-1/2 hidden md:block">
          <img
            src={img}
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-teal-900/70 to-transparent flex flex-col justify-end p-12">
            <div className="backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20">
              <h2 className="text-white text-3xl font-bold tracking-tight">
                Welcome Back.
              </h2>
              <p className="text-teal-50/90 mt-2 font-medium">
                Your account is ready for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Sign In
            </h1>
            <p className="text-slate-400 mt-2">Manage your PetHaven account.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-600 ml-1 block">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <HiOutlineMail size={20} />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="hello@pethaven.com"
                  className={`${inputClass(errors.email)} pl-12`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-600 block">
                  Password
                </label>
                <Link
                  to="/reset-password"
                  size="xs"
                  className="text-xs font-bold text-teal-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
                  <HiOutlineLockClosed size={20} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass(errors.password)} pl-12 pr-12`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-500 transition-colors"
                >
                  {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-bold ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-100 transition-all active:scale-[0.98] disabled:bg-slate-300 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-teal-600 font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
            <div className="mt-2">
              <Link
                to="/reset-password"
                className="text-teal-600 font-bold hover:underline"
              >
                Forget password {" "}
              </Link>
              <Link
                to="/resend-activation"
                className="text-teal-600 font-bold hover:underline"
              >
                || Resend activation email
              </Link>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
