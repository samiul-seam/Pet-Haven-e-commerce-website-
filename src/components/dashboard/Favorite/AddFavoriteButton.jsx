import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavoriteContext from "../../../hooks/useFavoriteContext";

const AddFavoriteButton = ({ petId }) => {
  const {
    getFavoriteId,
    isFavorited,
    addFavorite,
    removeFavorite,
    actionLoading,
  } = useFavoriteContext();
  
  const favorited = isFavorited(Number(petId));
  const favoriteId = getFavoriteId(Number(petId));

  // console.log(favorited);
  // console.log(favoriteId);
  // console.log("Button",petId);

  const handleClick = () => {
    if (favorited) removeFavorite(favoriteId);
    else addFavorite(petId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={actionLoading}
      className={
        "btn btn-lg btn-square transition-all bg-teal-700/30 border-teal-400/50 text-white hover:bg-teal-700"
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
