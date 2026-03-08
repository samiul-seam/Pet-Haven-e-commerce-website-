import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchPet = (
  categoryId,
  sortOrder,
  currentPage,
  priceRange,
  debouncedSearch,
) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchPets = async () => {
      setError(null);
      setIsLoading(true);
   
      const url = `/pets/?category_id=${categoryId}&price__gt=${priceRange.min - 1}&price__lt=${priceRange.max +1}&search=${debouncedSearch}&ordering=${sortOrder}&page=${currentPage}`;

      try {
        const response = await apiClient.get(url);
        const data = response.data;
        setPets(data.results);
        const pageLimit = 10;

        setTotalPage(Math.ceil(data.count / pageLimit));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchPets();
  }, [categoryId, sortOrder, currentPage, priceRange, debouncedSearch]);

  return { pets, isLoading, error, totalPage };
};

export default useFetchPet;
