import { useNavigate } from "react-router";
import { FaDog, FaSyringe, FaCat } from "react-icons/fa";
import { GiHummingbird, GiParrotHead } from "react-icons/gi";
import { MdOutlinePets } from "react-icons/md";
import { LuRabbit } from "react-icons/lu";

const CategoryItem = ({ category }) => {
  const navigate = useNavigate();

  const getIcon = (name) => {
    if (name.includes("Cat")) return <FaCat className="text-3xl text-orange-600" />;
    if (name.includes("Dog")) return <FaDog className="text-3xl text-orange-600" />;
    if (name.includes("Parrot")) return <GiParrotHead className="text-3xl text-orange-600" />;
    if (name.includes("Bird")) return <GiHummingbird className="text-3xl text-orange-600" />;
    if (name.includes("Rabbit")) return <LuRabbit className="text-3xl text-orange-600" />;
    if (name.includes("")) return <MdOutlinePets className="text-3xl text-orange-600" />;
    return <FaSyringe className="text-3xl text-orange-600" />;
  };

  return (
    <div
      onClick={() => navigate(`/shop?category=${category.id}`)}
      className="bg-white p-8 border border-gray-100 shadow-sm flex items-start gap-6 cursor-pointer h-full min-h-62.5 rounded-md"
    >
      {/* Icon Area */}
      <div className="shrink-0">
        {getIcon(category.name)}
      </div>

      {/* Text Area */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          {category.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {category.description || "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip."}
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;