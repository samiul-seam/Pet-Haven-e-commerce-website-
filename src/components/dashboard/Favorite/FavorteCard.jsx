import { HiCalendar, HiExternalLink, HiTrash } from "react-icons/hi";
import AdoptionPopUp from "../Adoption/AdoptionPopUp";
import { useState } from "react";

const FavorteCard = ({ item, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!item?.pet) return null;

  const { pet, created_at } = item;
  const isAdopted = pet.is_adopted;

  const formattedDate = new Date(created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Logic for form processing
    setIsOpen(false);
  };

  return (
    <div className="group bg-slate-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-transparent hover:border-teal-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-bold uppercase transition ${
              isAdopted 
              ? "text-gray-400 "
              : "text-orange-600 group-hover:text-orange-700"
            }`}>
              {pet.name}
            </h2>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-teal-50 text-orange-700 border border-teal-200">
              {pet.category_name}
            </span>
          </div>

          <button
            title="Remove from favorites"
            className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10 transition-colors"
            onClick={onRemove}
          >
            <HiTrash size={18} />
          </button>
        </div>

        <div className="my-4 border-t border-slate-200"></div>

        {/* Info Section */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Breed</span>
            <span className="text-slate-500">{pet.breed || "Unknown"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-700">Status</span>
            <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
              isAdopted 
                ? "bg-red-100 text-red-600" 
                : "bg-teal-100 text-teal-700"
            }`}>
              {isAdopted ? "Adopted" : "Available"}
            </span>
          </div>

          {/* Date Added */}
          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <HiCalendar />
              <span>Added</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => setIsOpen(true)}
            disabled={isAdopted}
            className={`w-full flex justify-center items-center gap-2 py-2.5 rounded-lg font-semibold transition-all active:scale-[0.98] ${
              isAdopted
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white text-orange-700 shadow-md shadow-slate-200 hover:bg-orange-600 hover:text-white border border-teal-600/10"
            }`}
          >
            {isAdopted ? "Already Adopted" : "Adopt Now"} 
            {!isAdopted && <HiExternalLink />}
          </button>
        </div>

        <AdoptionPopUp
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onSubmit={handlePaymentSubmit}
          petId={pet.id}
        />
      </div>
    </div>
  );
};

export default FavorteCard;