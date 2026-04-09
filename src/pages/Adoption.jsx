import { useEffect, useState } from "react";
import AdoptSection from "../components/dashboard/Adoption/AdoptSection";
import authApiClient from "../services/auth-api-client";
import Img from "../assets/images/boypet.jpg";
import { Link } from "react-router";
import preLoader from "../assets/images/preloader.gif";

const Adoption = () => {
  const [adoption, setAdoption] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchAdoptions = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get("/adoptions/");
        setAdoption(res.data);
      } catch (error) {
        console.error("Failed to fetch adoptions:", error);
      } finally {
        setLoading(false); // Turn off the spinner here
      }
    };

    fetchAdoptions();
  }, []);

  const handleCancelAdoption = async (AdoptId) => {
    try {
      const response = await authApiClient.post(
        `/adoptions/${AdoptId}/cancel/`,
      );
      if (response.status === 200) {
        setAdoption((prevAdopt) =>
          prevAdopt.map((adopt) =>
            adopt.id === AdoptId ? { ...adopt, status: "Cancel" } : adopt,
          ),
        );
        alert("Adoption canceled successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full min-h-50 relative overflow-hidden flex items-center">
        <img
          src={Img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Content */}
        <div className="relative z-20 w-full flex justify-evenly items-center text-white">
          <h1 className="text-1xl md:text-5xl font-extrabold tracking-tight">
            ADOPTION HISTORY
          </h1>

          <div className="flex items-center border border-gray-400/60 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-100 font-semibold">
              Adoption History
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center mt-20">
          <img src={preLoader} alt="Loading..." className="w-20 h-20" />
          <p className="text-white mt-4 font-medium tracking-widest uppercase">
            Loading Categories...
          </p>
        </div>
      ) : adoption.length > 0 ? (
        <div className="min-h-screen bg-teal-50/50 p-6">
          <AdoptSection adoption={adoption} onCancel={handleCancelAdoption} />
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">No adoption history found.</h2>
          <Link to="/shop" className="btn btn-teal mt-4">
            Browse Pets
          </Link>
        </div>
      )}
    </div>
  );
};

export default Adoption;
