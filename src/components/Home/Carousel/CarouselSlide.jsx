const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <div className="relative w-full" id="home">
      <img
        src={image}
        alt="banner"
        className="w-full h-screen object-cover"
      />

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-5">
          {title}
        </h1>

        <p className="text-lg md:text-xl mb-6 opacity-90">{subtitle}</p>

        <button className="btn bg-orange-500 border-yellow-800 rounded-full px-8">
          Browse Pets
        </button>
      </div>
    </div>
  );
};

export default CarouselSlide;