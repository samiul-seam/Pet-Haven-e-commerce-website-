import { Link } from "react-router";

const CTASection = () => {
  return (
    <div>
      <section className="px-4 pb-16 bg-teal-700 p-13">
        <div className="max-w-6xl mx-auto bg-teal-800 rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pet?
          </h2>
          <p className="text-teal-100 mb-10 max-w-xl mx-auto">
            Join thousands of happy pet owners who found their companions
            through our platform. Start your journey today!
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="shop"  className="bg-white text-teal-800 font-bold py-3 px-8 rounded-full hover:bg-teal-50 transition-colors w-full sm:w-auto">
              Browse Pets
            </Link>
            <a href="https://www.linkedin.com/in/md-samiul-haque-seam-695833361/" target="_blank" className="bg-teal-700 text-white border border-teal-600 font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors w-full sm:w-auto">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTASection;
