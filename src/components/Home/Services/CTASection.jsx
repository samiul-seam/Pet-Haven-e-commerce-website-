import { Link } from "react-router";
import bgImg from "../../../assets/images/pattern-1.png";

const CTASection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image - Using object-cover to ensure it fills the space */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgImg} 
          alt="" 
          className="w-full h-full object-cover" 
        />
        {/* Overlay to ensure text stays readable */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <section className="relative z-10 px-4 py-20 md:py-28">
        <div className="max-w-6xl mx-auto bg-orange-500 rounded-[2rem] p-10 md:p-20 text-center text-white shadow-2xl border border-white/10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Ready to Find Your Perfect Pet?
          </h2>
          <p className="text-orange-50 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Join thousands of happy pet owners who found their companions
            through our platform. Start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/shop"
              className="bg-white text-orange-600 font-bold py-4 px-10 rounded-full hover:bg-orange-50 hover:scale-105 transition-all w-full sm:w-auto shadow-md"
            >
              Browse Pets
            </Link>
            <a
              href="https://www.linkedin.com/in/md-samiul-haque-seam-695833361/"
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-orange-600 hover:scale-105 transition-all w-full sm:w-auto"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;