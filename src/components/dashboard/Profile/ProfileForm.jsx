const ProfileForm = ({ register, errors }) => {
  // Clean, consistent class that stands out against bg-cyan-100
 const inputClass = (errors) =>
    `input input-bordered w-full bg-slate-200 focus:bg-white border-slate-300 text-slate-600 ${
      errors ? "input-error" : "focus:border-teal-500"
    }`;

  return (
    <div className="space-y-5 mb-4">
      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className={inputClass(errors.first_name)}
            {...register("first_name", { required: "First name is required" })}
          />
          
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className={inputClass(errors.last_name)}
            {...register("last_name")}
          />
        </div>
      </div>

      {/* Email Section */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-bold text-slate-700">Email Address</span>
        </label>
        <input
          type="email"
          className={inputClass(errors.email)}
          disabled
          {...register("email")}
        />
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">Phone Number</span>
          </label>
          <input
            type="text"
            placeholder="Phone Number"
            className={inputClass(errors.phone_number)}
            {...register("phone_number")}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-bold text-slate-700">Address</span>
          </label>
          <input
            type="text"
            placeholder="City, Country"
            className={inputClass(errors.address)}
            {...register("address")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;