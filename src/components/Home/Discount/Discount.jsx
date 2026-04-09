import { Link } from "react-router";
import DiscountTimer from "./DiscountTimer";
import paperImg from "../../../assets/images/2.png";
import firstPaperImg from "../../../assets/images/layer-1(rotate).png"

const Discount = () => {
  return (
    <div>
      <img src={firstPaperImg} alt="" className="bg-orange-600"/>
      <div className="bg-orange-600 p-8 md:p-12 text-center text-white">
        <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-teal-400/20">
          Limited Time Offer
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Special Adoption Event
        </h2>
        <p className="text-teal-100 mb-8 text-lg">
          Get 30% off adoption fees for all pets this weekend!
        </p>

        {/* Countdown Timer */}
        <div>
          <DiscountTimer />
        </div>

        <Link
          to={"shop"}
          className="bg-white text-yellow-500 font-bold py-6 px-8 rounded-full hover:bg-orange-400 transition-colors shadow-lg cursor-pointer btn"
        >
          Claim Your Discount
        </Link>
      </div>

      <img src={paperImg} alt="" className="bg-orange-600" />
    </div>
  );
};

export default Discount;
