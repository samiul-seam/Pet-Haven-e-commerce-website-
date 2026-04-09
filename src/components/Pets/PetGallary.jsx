import pet1 from "../../assets/images/1.jpg";
import pet2 from "../../assets/images/2.jpg";
import pet3 from "../../assets/images/3.jpg";
import pet4 from "../../assets/images/4.jpg";
import pet5 from "../../assets/images/5.jpg";
import pet6 from "../../assets/images/6.jpg";
import titleIcon from "../../assets/images/title-icon.png";

const PetGallary = () => {
  const picSection = [
    {
      id: 1,
      pic: pet1,
    },
    {
      id: 2,
      pic: pet2,
    },
    {
      id: 3,
      pic: pet3,
    },
    {
      id: 4,
      pic: pet4,
    },
    {
      id: 5,
      pic: pet5,
    },
    {
      id: 6,
      pic: pet6,
    },
  ];

  return (
    <div className="container mx-auto mt-12 px-14">
      <div className="flex flex-col items-center justify-between gap-6">
        <div>
          <img src={titleIcon} alt="icon Image" className="" />
        </div>
        <h1 className="text-5xl font-bold text-black mb-3">Works Gallery</h1>
        <span className="text-md text-gray-500">
          For professional dog and cat grooming needs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-12">
        {picSection.map((item) => (
          <div key={item.id} className="">
            <img
              src={item.pic}
              alt="petImage"
              className="rounded-md shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetGallary;
