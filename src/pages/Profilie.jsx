import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import {
  HiOutlineMail,
  HiOutlineBadgeCheck,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import ProfileButtons from "../components/dashboard/Profile/ProfileButtions";
import ProfileForm from "../components/dashboard/Profile/ProfileForm";
import PasswordForm from "../components/dashboard/Profile/PasswordForm";
import authApiClient from "../services/auth-api-client";
import useFavoriteContext from "../hooks/useFavoriteContext";
import { FaHome, FaMobileAlt } from "react-icons/fa";
import bgImg from "../assets/images/welcome.jpg";

const Profile = () => {
  const { user, errorMsg, updateUserProfile, changePassword } =
    useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  useEffect(() => {
    setIsLoading(true);
    const fetchAdopt = async () => {
      try {
        const res = await authApiClient.get("adoptions/");
        setOrderCount(res.data.length);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdopt();
  }, []);

  const { favorites, loading } = useFavoriteContext();

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

      if (data.current_password && data.new_password && data.re_new_password) {
        try {
          const payload = {
            current_password: data.current_password,
            new_password: data.new_password,
            re_new_password: data.re_new_password,
          };
          const res = await changePassword(payload);

          if (res.status === 201 || res.status === 200) {
            alert("Password changed successfully!");
            reset();
            setIsEditing(false);
            return;
          }
        } catch {
          alert("Password update failed.");
          return;
        }
      }
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error.response?.data);
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <div className="h-48 md:h-64 relative">
        <img
          src={bgImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute -bottom-16 left-4 md:left-12 flex items-end gap-4">
          <div className="avatar">
            <div className="w-32 md:w-40 rounded-full border-4 border-white shadow-xl bg-slate-200">
              <div className="flex items-center justify-center h-full text-slate-400">
                <HiOutlineUserCircle size={80} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-2 min:grid-cols-1 gap-8">
          {/* Left */}
          <div className="space-y-6">
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
                    {user.is_staff ? (
                      <p className="text-slate-500 text-sm mb-4">
                        Admin of PetHaven community
                      </p>
                    ) : (
                      <p className="text-slate-500 text-sm mb-4">
                        Member of PetHaven community
                      </p>
                    )}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-slate-600">
                        <HiOutlineMail className="text-orange-500" size={20} />
                        <span className="text-sm">{user?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <FaHome className="text-yellow-500" size={20} />
                        <span className="text-sm">{user?.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <FaMobileAlt className="text-orange-500" size={20} />
                        <span className="text-sm">{user?.phone_number}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <HiOutlineBadgeCheck
                          className="text-yellow-500"
                          size={20}
                        />
                        <span className="badge badge-warning badge-outline w-50">
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
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="stats shadow-sm border border-slate-100 w-full bg-white">
              <div className="stat">
                <div className="stat-title text-slate-500">Favorite</div>
                <div className="stat-value text-yellow-600 text-3xl">
                  {loading ? (
                    <div className="loading loading-spinner"> </div>
                  ) : (
                    favorites.length
                  )}
                </div>
                <div className="stat-desc text-slate-400">Pets</div>
              </div>

              <div className="stat">
                <div className="stat-title text-slate-500">Adopted</div>
                <div className="stat-value text-orange-600 text-3xl">
                  {isLoading ? (
                    <div className="loading loading-spinner"> </div>
                  ) : (
                    orderCount
                  )}
                </div>
                <div className="stat-desc text-slate-400">Pets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
