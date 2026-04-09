import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useSimpleFetchPets = ( currentPage ) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
 
      try {
        const res = await apiClient.get(`/pets/?page=${currentPage}`);
        const data = res.data;
        setPets(data.results);

        const pageLimit = 10;
        setTotalPage(Math.ceil(data.count / pageLimit));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, [currentPage]);

  return { pets, isLoading, totalPage };
};

export default useSimpleFetchPets;
