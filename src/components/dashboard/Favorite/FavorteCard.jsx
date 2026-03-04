import { HiCalendar, HiExternalLink, HiTrash } from "react-icons/hi";
import AdoptionPopUp from "../Adoption/AdoptionPopUp";
import { useState } from "react";

const FavorteCard = ({ item, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!item?.pet) return null;

  const formattedDate = new Date(item.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

   const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    Object.fromEntries(formData.entries());
    setIsOpen(false);
  };


  return (
    <div className="group bg-slate-100 rounded-xl shadow-md hover:shadow-xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold uppercase text-teal-700 group-hover:text-teal-800 transition">
              {item.pet.name}
            </h2>

            <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {item.pet.category_name}
            </span>
          </div>

          <button className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10" onClick={onRemove}>
            <HiTrash size={18} />
          </button>
        </div>

        <div className="my-4 border border-teal-50"></div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">Breed</span>
            <span className="text-slate-500">
              {item.pet.breed || "Unknown"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-700">Status</span>

            {item.pet.is_adopted ? (
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-red-200 text-red-600">
                Adopted
              </span>
            ) : (
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-teal-200 text-teal-700">
                Available
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <HiCalendar />
              <span>Added</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-6">
          <button onClick={() => setIsOpen(true)} className="w-full flex justify-center items-center gap-2 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 active:scale-[0.98] transition">
            Adopt Now <HiExternalLink />
          </button>
        </div>
        <AdoptionPopUp isOpen={isOpen} onClose={()=> setIsOpen(false)} onSubmit={handlePaymentSubmit} petId={item.pet.id} />
      </div>
    </div>
  );
};

export default FavorteCard;