import { Link } from "react-router";
import defaultImage from "../../assets/images/default.jpg";

const ShopCard = ({ pet }) => {
  return (
    <Link to={`/shop/${pet.id}`}>
      <div className="w-full max-w-sm">
        <div className="card bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-sm">
          <div className="px-4 py-4 relative">
            {pet.price === 0 ? (
              <div className="px-2 rounded-md bg-yellow-400 text-gray-600 absolute top-2 left-2 z-5">
                Free
              </div>
            ) : (
              <div className="px-2 rounded-md bg-orange-600 text-white absolute top-2 left-2 z-5">
                Premium
              </div>
            )}
            <img
              src={pet.images?.length > 0 ? pet.images[0]?.image : defaultImage}
              alt={pet.name}
              className="rounded-xl object-cover h-55 w-full"
            />
          </div>

          <div className="card-body">
            <h2 className="text-center text-gray-600 text-2xl font-semibold">{pet.name}</h2>
            <p className="card-title text-gray-400 justify-between line-clamp-2">
              {pet.description}..
            </p>
            <div className="card-actions justify-between items-center mt-3">
              {!pet.is_adopted? (<span className="font-bold text-gray-700">${pet.price}</span>): (
                <span className="bg-red-500 px-2 rounded-lg">Adopted</span>
              )}
              <div className="badge badge-outline text-gray-500">{pet.breed}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
