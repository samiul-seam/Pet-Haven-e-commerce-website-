import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchCategory = () => {
  const [categories, setCatagories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      apiClient.get("/categories/").then((res) => setCatagories(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, []);

  return {categories, isLoading};
};

export default useFetchCategory;
