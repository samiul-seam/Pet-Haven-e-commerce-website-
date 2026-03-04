import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";


const PetList = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/pets/update/${pet.id}`);
  };

  return (
    <>
      <tbody className="text-slate-500 text-sm bg-slate-200 hover:bg-slate-300">
        <tr onClick={handleClick} className="relative group cursor-pointer">
          <td className="relative">
            {pet.id}
            <span className="absolute top-1/2 -translate-y-1/2 ml-9 hidden group-hover:flex items-center gap-2">
              <FaEdit className="text-blue-500" />
              <FaTrash className="text-red-500" />
            </span>
          </td>
          <td>{pet.name}</td>
          <td>{pet.category_name}</td>
          <td>{pet.breed}</td>
          <td>{pet.price}</td>
          <td>
            {pet.is_adopted ? (
              <div className="bg-red-500 rounded-md text-center text-white">
                Adopted
              </div>
            ) : (
              <div className="bg-green-500 rounded-md text-white text-center">
                Available
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default PetList;
