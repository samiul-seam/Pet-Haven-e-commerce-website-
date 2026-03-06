import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://pet-haven-kappa.vercel.app/api"
})
 
export default apiClient;