import {
  HiOutlinePencilAlt,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";

const ProfileButtons = ({ isEditing, setIsEditing, isSubmitting }) => {
  return (
    <div className="w-full">
      {isEditing ? (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="btn btn-teal-600 bg-orange-400 border-gray-200 shadow-lg text-slate-700 shadow-gray-400 hover:shadow-none "
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <HiOutlineCheckCircle size={18} /> Save
              </>
            )}
          </button>
          <button
            type="button"
            className="btn btn-outline bg-red-600 border-gray-200 shadow-lg text-white shadow-gray-400 hover:shadow-none"
            onClick={() => setIsEditing(false)}
          >
            <HiOutlineXCircle size={18} /> Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-block font-bold rounded-lg bg-orange-400 border-gray-200 shadow-xl text-slate-700 shadow-gray-400 hover:shadow-none group "
          onClick={() => setIsEditing(true)}
        >
          <HiOutlinePencilAlt size={18} />
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;
