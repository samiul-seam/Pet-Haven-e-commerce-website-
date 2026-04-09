import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavoriteContext from "../../../hooks/useFavoriteContext";
import { useNavigate } from "react-router";

const AddFavoriteButton = ({ petId, user }) => {
  const {
    getFavoriteId,
    isFavorited,
    addFavorite,
    removeFavorite,
    actionLoading,
  } = useFavoriteContext();

  const favorited = isFavorited(Number(petId));
  const favoriteId = getFavoriteId(Number(petId));

  const navigate = useNavigate();
  // console.log(favorited);
  // console.log(favoriteId);
  // console.log("Button",petId);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      if (favorited) removeFavorite(favoriteId);
      else addFavorite(petId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={actionLoading}
      className={
        "btn btn-lg btn-square transition-all bg-orange-500 border-orange-400/50 text-white hover:bg-orange-800/30"
      }
    >
      {actionLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : favorited ? (
        <FaHeart size={22} />
      ) : (
        <FaRegHeart size={22} />
      )}
    </button>
  );
};

export default AddFavoriteButton;
