import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineBadgeCheck,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import ProfileButtons from "../components/dashboard/Profile/ProfileButtions";
import ProfileForm from "../components/dashboard/Profile/ProfileForm";
import PasswordForm from "../components/dashboard/Profile/PasswordForm";

const Profile = () => {
  const { user, updateUserProfile, changePassword } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };
      await updateUserProfile(profilePayload);
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header / Cover Section */}
      <div className="h-48 md:h-64 bg-linear-to-r from-teal-600 to-cyan-500 relative">
        <div className="absolute -bottom-16 left-4 md:left-12 flex items-end gap-4">
          <div className="avatar">
            <div className="w-32 md:w-40 rounded-full border-4 border-white shadow-xl bg-slate-200">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Profile" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <HiOutlineUserCircle size={80} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-white shadow-sm border border-slate-100 p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                {!isEditing ? (
                  <div className="mb-6">
                    {" "}
                    <div className="flex gap-2">
                      <h2 className="text-2xl font-bold text-slate-800">
                        {user?.first_name || "Pet"}
                      </h2>
                      <h2 className="text-2xl font-bold text-slate-800">
                        {user?.last_name || "Lover"}
                      </h2>
                    </div>
                    <p className="text-slate-500 text-sm mb-4">
                      Member of PetHaven community
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <HiOutlineMail className="text-teal-500" size={20} />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <HiOutlineCalendar
                          className="text-teal-500"
                          size={20}
                        />
                        <span className="text-sm">Joined Feb 2026</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <HiOutlineBadgeCheck
                          className="text-teal-500"
                          size={20}
                        />
                        <span className="badge badge-success badge-outline">
                          Verified Owner
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <ProfileForm
                      register={register}
                      errors={errors}
                      isEditing={isEditing}
                    />
                    <PasswordForm
                      register={register}
                      watch={watch}
                      errors={errors}
                    />
                  </div>
                )}

                <ProfileButtons
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  isSubmitting={isSubmitting}
                />
              </form>
            </div>
          </div>

          {/* Right Column: Details & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Card */}
            <div className="stats shadow-sm border border-slate-100 w-full bg-white">
              <div className="stat">
                <div className="stat-title text-slate-500">Total Pets</div>
                <div className="stat-value text-teal-600 text-3xl">02</div>
                <div className="stat-desc text-slate-400">Dogs & Cats</div>
              </div>

              <div className="stat">
                <div className="stat-title text-slate-500">Orders</div>
                <div className="stat-value text-cyan-600 text-3xl">12</div>
                <div className="stat-desc text-slate-400">Total purchases</div>
              </div>

              <div className="stat">
                <div className="stat-title text-slate-500">Points</div>
                <div className="stat-value text-orange-500 text-3xl">450</div>
                <div className="stat-desc text-slate-400">Loyalty rewards</div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
