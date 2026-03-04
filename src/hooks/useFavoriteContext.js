import { useContext } from "react";
import FavoriteContext from "../Context/FavoriteContext";

const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};

export default useFavoriteContext;

