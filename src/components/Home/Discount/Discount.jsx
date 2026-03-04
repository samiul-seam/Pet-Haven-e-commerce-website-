import { Link } from "react-router";
import DiscountTimer from "./DiscountTimer";

const Discount = () => {
  return (
    <div>
      <section className="bg-teal-700 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-teal-600/30 border border-teal-500/30 rounded-3xl p-8 md:p-12 text-center text-white">
          <span className="inline-block bg-teal-800/50 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-teal-400/20">
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

          <Link to={"shop"} className="bg-white text-teal-700 font-bold py-6 px-8 rounded-full hover:bg-teal-300 transition-colors shadow-lg cursor-pointer btn">
            Claim Your Discount
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Discount;
