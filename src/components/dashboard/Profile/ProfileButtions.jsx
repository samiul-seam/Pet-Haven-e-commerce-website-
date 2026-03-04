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
            className="btn btn-teal-600 bg-teal-600 hover:bg-teal-700 text-white border-none"
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
            className="btn btn-outline bg-red-500 text-white hover:bg-red-600"
            onClick={() => setIsEditing(false)}
          >
            <HiOutlineXCircle size={18} /> Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-block bg-teal-500 border-slate-200 text-slate-700 hover:bg-teal-50 hover:border-teal-200 group"
          onClick={() => setIsEditing(true)}
        >
          <HiOutlinePencilAlt
            className="group-hover:text-teal-600 transition-colors"
            size={18}
          />
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileButtons;
