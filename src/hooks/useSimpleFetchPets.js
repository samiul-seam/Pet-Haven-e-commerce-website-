import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useSimpleFetchPets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);

      try {
        const res = await apiClient.get("/pets/");
        setPets(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets(); 
  }, []);

  return { pets, isLoading };
};

export default useSimpleFetchPets;
