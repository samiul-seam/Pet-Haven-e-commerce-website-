import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

const CategoryList = ({ category }) => {
  const navigate = useNavigate();

  const handleudpateCategory = () => {
    navigate(`/dashboard/categories/update/${category.id}`);
  };

  return (
    <>
      <tbody className="text-slate-500 text-sm bg-slate-200 hover:bg-slate-300 ">
        <tr className="relative group cursor-pointer" onClick={handleudpateCategory}>
          <td className="relative">
            {category.id}
            <span className="absolute top-1/2 -translate-y-1/2 ml-9 hidden group-hover:flex items-center gap-2">
              <FaEdit className="text-blue-500" />
              <FaTrash className="text-red-500" />
            </span>
          </td>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>{category.num_pets}</td>
        </tr>
      </tbody>
    </>
  );
};

export default CategoryList;
