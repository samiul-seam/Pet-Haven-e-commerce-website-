import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router";

const PasswordForm = ({ register, watch, errors }) => {
  const inputClass = (errors) =>
    `input input-bordered w-full bg-slate-200 focus:bg-white border-slate-300 text-slate-600 ${
      errors ? "input-error" : "focus:border-teal-500"
    }`;

  const [isPasswordSection, setIsPasswordSection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("new_password");

  return (
    <div>
      <div className="mt-8 pt-6 border-t-2 border-teal-50 animate-in fade-in slide-in-from-top-2 duration-500 mb-4">
        <button
          type="button"
          className="btn btn-link p-0 justify-start text-primary font-semibold h-auto min-h-0 mb-4"
          onClick={() => setIsPasswordSection(!isPasswordSection)}
        >
          {isPasswordSection ? "Close Password Section" : "Change Password"}
        </button>

        {isPasswordSection && (
          <div>
            <h4 className="text-sm font-black text-teal-600 uppercase tracking-widest mb-4">
              Security Update
            </h4>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-slate-700">
                  Current Password
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClass(errors.current_password)}
                {...register("current_password", {
                  require: "Current password is required to make change",
                })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700">
                    New Password
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClass(errors.new_password)}
                  {...register("new_password", {
                    require: "Password must be at least 6 characters",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700">
                    Confirm Current Password
                  </span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm to save"
                  className={inputClass(errors.re_new_password)}
                  {...register("re_new_password", {
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>

              <div className="text-teal-600 flex items-center gap-2">
                <span className="text-slate-500">Show Password </span>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                </button>
              </div>
              <Link
                to="/reset-password"
                name="Forget password?"
                className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
              >
                Forget Password?
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordForm;
