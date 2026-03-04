import { useEffect, useState } from "react";
import AdoptSection from "../components/dashboard/Adoption/AdoptSection";
import authApiClient from "../services/auth-api-client";

const Adoption = () => {
  const [Adoption, setAdoption] = useState([]);

  useEffect(() => {
    authApiClient.get("/adoptions/").then((res) => setAdoption(res.data));
  }, []);


  const handleCancelAdoption = async(AdoptId) => {
    try{
      const response = await authApiClient.post(`/adoptions/${AdoptId}/cancel/`)
      if(response.status === 200){
        setAdoption((prevAdopt)=>
          prevAdopt.map((adopt)=> 
            adopt.id === AdoptId ? {...adopt, status:"Cancel"} : adopt
          )
        )
        alert("Adoption canceled successfully!")
      }
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-teal-50/50 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-teal-800 tracking-tight">
        Adoption History
      </h1>
      <AdoptSection Adoption={Adoption} onCancel={handleCancelAdoption} />
    </div>
  );
};

export default Adoption;
