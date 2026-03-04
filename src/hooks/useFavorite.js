// hooks/useFavorite.js
import { useState, useEffect } from "react";
import authApiClient from "../services/auth-api-client";

const useFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get("/favorites/");
        setFavorites(res.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      } finally {
        setLoading(false);
      } 
    };
    fetchFavorites();
  }, []);

  // Check if a pet is already favorited or not
  const isFavorited = (petId) => favorites.some((f) => f.pet.id === petId);

  // favoriteId
  const getFavoriteId = (petId) => {
    const found = favorites.find((f) => f.pet.id === petId);
    return found ? found.id : null;
  };

  // Add
  const addFavorite = async (petId) => {
    if (actionLoading || isFavorited(petId)) return;
    setActionLoading(true);
    try {
      const res = await authApiClient.post("/favorites/", { pet_id: petId });
      setFavorites((prev) => [...prev, res.data]);
      alert("Added to favorites");
    } catch (error) {
      console.error(error.message);
      alert("Failed to add favorite");
    } finally {
      setActionLoading(false);
    }
  };

  // Remove
  const removeFavorite = async (favoriteId) => {
    if (actionLoading) return;
    setActionLoading(true);
    try {
      await authApiClient.delete(`/favorites/${favoriteId}/`);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
      alert("Removed from favorites");
    } catch (error) {
      console.error(error.message);
      alert("Failed to remove favorite");
    } finally {
      setActionLoading(false);
    }
  };

  return {
    favorites,
    loading,
    actionLoading,
    addFavorite,
    removeFavorite,
    isFavorited,
    getFavoriteId,
  };
};

export default useFavorite;
