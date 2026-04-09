import { Link } from "react-router";
import defaultImage from "../../assets/images/default.jpg";

const PetCard = ({ pet }) => {
  return (
    <div
      key={pet.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
    >
      {pet.images ? (
        <img
          src={pet.images[0].image}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <img
          src={defaultImage}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-lg text-yellow-500 font-bold">{pet.name}</h2>
        <p className="text-sm text-gray-500">{pet.breed}</p>

        <div className="mt-3 flex justify-between items-center">
          <span className="text-orange-600 font-semibold">{pet.age} yrs</span>

          <Link
            to={`/shop/${pet.id}`}
            className="text-sm text-blue-500 hover:underline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
