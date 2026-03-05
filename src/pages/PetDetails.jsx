import { useEffect, useState } from "react";
import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import ImageCarousel from "../components/ProfileDetails/ImageCarousel";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import defaultImage from "../assets/images/default.jpg";
import AddFavoriteButton from "../components/dashboard/Favorite/AddFavoriteButton";
import Reviews from "../components/Reviews/ReviewSection";
import useAuthContext from "../hooks/useAuthContext";
import AdoptionPopUp from "../components/dashboard/Adoption/AdoptionPopUp";
import { TbCurrencyTaka } from "react-icons/tb";

const PetDetails = () => {
  const [showImageId, setShowImageId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthContext();

  const { petId } = useParams();
  // console.log("This is form PetId params",petId);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData.entries());
    setIsOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/pets/${petId}`)
      .then((res) => {
        setPet(res.data);
      })
      .catch((err) => {
        console.error(err);
        setPet(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [petId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyan-100 flex justify-center items-center">
        <span className="loading loading-dots loading-lg text-teal-600"></span>
      </div>
    );
  }
  if (!pet) {
    return (
      <div className="min-h-screen bg-cyan-100 flex flex-col justify-center items-center gap-4">
        <h1 className="bg-red-500 text-white font-bold text-3xl rounded-md px-6 py-2 shadow-lg">
          Pet Not Available
        </h1>
        <Link to="/shop" className="btn btn-ghost text-teal-700 underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFree = pet.price === 0;

  return (
    <div className="min-h-screen bg-cyan-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-teal-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* --- Left: Image Section --- */}
          <div className="p-6 bg-slate-50">
            <div className="aspect-square bg-white rounded-2xl shadow-inner overflow-hidden border border-teal-50 relative group">
              {pet.is_adopted ? (
                <div className="absolute top-4 right-4 z-10 badge badge-error p-4 text-white font-bold uppercase shadow-lg">
                  Adopted
                </div>
              ) : (
                <div className="absolute top-4 right-4 z-10 badge badge-error p-4 text-white font-bold uppercase shadow-lg">
                  Available
                </div>
              )}
              <img
                src={pet.images[showImageId]?.image || defaultImage}
                alt={pet.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="mt-6">
              <ImageCarousel setShowImageId={setShowImageId} pet={pet} />
            </div>
          </div>

          {/* --- Right: Info Section  --- */}
          <div className="p-8 bg-linear-to-br from-teal-500 to-teal-600 text-white flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-80 mb-2">
                <Link to="/" className="hover:underline mx-2">
                  Home
                </Link>
                /
                <Link to="/shop" className="hover:underline mx-2">
                  Shop
                </Link>
                /<span className="font-bold mx-2">{pet.name}</span>
              </div>

              <h1 className="text-5xl font-black mb-2 drop-shadow-md">
                {pet.name}
              </h1>

              <div className="text-4xl font-bold mb-4 bg-white/20 inline-block px-4 py-1 rounded-lg backdrop-blur-md mt-6">
                {isFree ? (
                  "FREE ADOPTION"
                ) : (
                  <span className="flex items-center gap-1">
                    <TbCurrencyTaka />
                    {pet.price}
                  </span>
                )}
              </div>

              <div className="flex">
                <span className="text-xl">Breed:</span>
                {pet.breed ? (
                  <p className="text-teal-50 text-center mb-8 text-lg bg-white/10 px-4 rounded-md mx-1">
                    {pet.breed}
                  </p>
                ) : (
                  <p className="text-teal-50 w-20 mb-8 text-lg bg-white/10 px-4 rounded-md mx-1">
                    Unknown
                  </p>
                )}
              </div>
              <span className="text-md">Age: {pet?.age || "Unknown"}</span>
            </div>

            {/* Action Buttons */}
            {pet.is_adopted ? (
              <div className="bg-teal-700/20 p-4 rounded-xl border border-teal-400/30 text-center">
                <h1 className="text-xl font-bold text-white">
                  This pet is already adopted
                </h1>
                <p className="text-teal-100 text-sm">
                  Follow us for more updates on new arrivals!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-lg flex-1 bg-white border-none text-teal-600 hover:bg-cyan-50 shadow-xl transition-all active:scale-95"
                  >
                    <ShoppingCart size={22} />
                    Adopt Now
                  </button>
                  <AdoptionPopUp
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSubmit={handlePaymentSubmit}
                    petId={petId}
                  />

                  <AddFavoriteButton petId={petId} />
                </div>
              </div>
            )}

            {/* Trust Badges inside the teal card */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/10 rounded-full">
                  <Truck size={16} />
                </div>
                <span>Nationwide Pet Travel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/10 rounded-full">
                  <ShieldCheck size={16} />
                </div>
                <span>Health Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom: Tabs Section --- */}
      <div className=" p-8 bg-teal-50 mt-4">
        <div
          role="tablist"
          className="tabs tabs-bordered bg-white p-2 rounded-2xl shadow-sm"
        >
          <input
            type="radio"
            name="tabs"
            role="tab"
            className="tab font-bold text-teal-600"
            aria-label="Description"
            checked
            readOnly
          />
          <div
            role="tabpanel"
            className="tab-content p-6 text-teal-900 bg-slate-300"
          >
            {pet.description}
          </div>

          <input
            type="radio"
            name="tabs"
            role="tab"
            className="tab font-bold text-teal-600"
            aria-label="Reviews"
          />
          <div role="tabpanel" className="tab-content p-6 bg-slate-300">
            <Reviews pet={pet} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
