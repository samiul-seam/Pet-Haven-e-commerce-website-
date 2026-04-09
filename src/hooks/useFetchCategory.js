import { useState, useEffect } from "react";
import apiClient from "../services/api-client"

const useFetchCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    apiClient
      .get("/categories/")
      .then((res) => {
        setCategories(res.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setIsLoading(false);
      });
      
  }, []);

  return { categories, isLoading };
};

export default useFetchCategory;