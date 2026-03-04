import { Link } from "react-router";
import defaultImage from "../../../assets/images/default.jpg";

const PetCard = ({ pet }) => {
  return (
    <Link to={`/shop/${pet.id}`}>
      <div className="w-full max-w-sm">
        <div className="card bg-teal-600 shadow-sm">
          <figure className="px-4 py-4 relative">
            {pet.price === 0 ? (
              <div className="badge badge-secondary absolute top-2 left-2 z-5">
                Free
              </div>
            ) : (
              <div className="badge badge-secondary absolute top-2 left-2 z-5">
                Premium
              </div>
            )}
            <img
              src={pet.images?.length > 0 ? pet.images[0]?.image : defaultImage}
              alt={pet.name}
              className="rounded-xl object-cover h-48 w-full"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title justify-between">{pet.name}</h2>
            <p className="card-title justify-between line-clamp-1">
              {pet.description}
            </p>
            <div className="card-actions justify-between items-center">
              {!pet.is_adopted ? (
                <span className="font-semibold">${pet.price}</span>
              ) : (
                <span className="bg-red-500 px-2 rounded-lg">Adopted</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
