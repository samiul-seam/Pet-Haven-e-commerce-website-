const About = () => {
  return (
    <div className="bg-slate-200 p-8 rounded-xl border border-slate-300 shadow-md text-slate-700">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-slate-600 mb-6">
          About PetAdopt
        </h2>

        <p className="mb-8 leading-relaxed">
          This project is a full-stack web application designed to help pets
          find new homes. It allows users to browse available pets, filter them
          by category or price, and read reviews from other adopters.
        </p>

        {/* The Grid: Features we actually coded */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-100 p-5 rounded-lg border border-slate-300">
            <h4 className="font-bold text-orange-700 mb-2">Pet Management</h4>
            <p className="text-sm">
              An admin dashboard where I can add new pets, update their details,
              and manage multiple images using a dedicated image upload system.
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-lg border border-slate-300">
            <h4 className="font-bold text-yellow-500 mb-2">Adoption System</h4>
            <p className="text-sm">
              Users can view pet details and see if they are available. Once
              adopted, the status updates across the site in real-time.
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-lg border border-slate-300">
            <h4 className="font-bold text-yellow-500 mb-2">Review & Ratings</h4>
            <p className="text-sm">
              A review system where verified adopters can leave star ratings and
              comments. It includes full CRUD logic (Create, Read, Update,
              Delete).
            </p>
          </div>

          <div className="bg-slate-100 p-5 rounded-lg border border-slate-300">
            <h4 className="font-bold text-orange-700 mb-2">Advanced Filtering</h4>
            <p className="text-sm">
              Built-in search and filtering hooks to sort pets by their breed,
              category, and price range for a better user experience.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-10 pt-6 border-t border-slate-300">
          <h4 className="font-semibold mb-3">Technologies used:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs">
              React.js
            </span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs">
              Django REST Framework
            </span>
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs">
              Tailwind CSS
            </span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
