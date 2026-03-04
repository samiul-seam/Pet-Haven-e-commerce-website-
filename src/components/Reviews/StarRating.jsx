import { FaStar } from "react-icons/fa";
 
const StarRating = ({ onChange, rating }) => {
  return (
    <div>
      <div className="flex gap-1 cursor-pointer">
        {[...Array(5)].map((_, i) => {
          const value = i + 1;
          return (
            <FaStar
              key={i}
              onClick={() => onChange(value)}
              className={`cursor-pointer transition-colors duration-200 
                ${i < rating ? "text-yellow-500" : "text-slate-400"}
              hover:text-yellow-500`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
