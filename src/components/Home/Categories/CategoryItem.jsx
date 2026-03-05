import { useNavigate } from "react-router";

const CategoryItem = ({ category, index }) => {
  const linears = [
    "from-pink-300 to-teal-300",
    "from-blue-300 to-pink-300",
    "from-teal-300 to-blue-300",
    "from-green-300 to-teal-300",
  ];

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/shop?category=${category.id}`)}
      className="cursor-pointer"
    >
      <div
        className={`p-6 bg-linear-to-br ${linears[index % linears.length]} w-45 h-42 rounded-xl flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-sm`}
      >
        <div className="bg-white p-3 rounded-full mb-3 shadow-sm text-slate-700">
          {category.name}
        </div>
        <span className="font-bold text-sm line-clamp-2 text-center">
          {category.description}
        </span>
        <span className="text-xs text-slate-400">{category.length} </span>
      </div>
    </div>
  );
};

export default CategoryItem;
