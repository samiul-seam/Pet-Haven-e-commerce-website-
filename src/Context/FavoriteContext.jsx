import { createContext } from "react";
import useFavorite from "../hooks/useFavorite";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const value = useFavorite();
  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
