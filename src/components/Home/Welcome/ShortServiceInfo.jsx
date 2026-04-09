import titleIcon from "../../../assets/images/title-icon.png";
import { GiBirdHouse, GiDogHouse, GiJumpingDog } from "react-icons/gi";

const ShortServiceInfo = () => {
  return (
    <div className="container mx-auto mt-7 mb-12">
      <div className="flex flex-col items-center gap-4">
        <img src={titleIcon} alt="" />
        <h1 className="text-black text-4xl font-bold">
          All Types of Grooming Services
        </h1>
        <span className="text-gray-600 text-md">
          For professional dog and cat grooming needs Fanatic clearly
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mt-9">
        <div className="flex flex-col items-center gap-7">
          <GiJumpingDog className="text-gray-700 w-35 h-34 px-4 rounded-full hover:bg-yellow-600 hover:text-white" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-black hover:text-orange-500 font-semibold text-xl">
              Experienced Staff
            </h1>
            <span className="text-gray-500 text-md">
              Well gaudy hound hired set flailed much followed less this
              maternal well unavoidable crudely aloof more save groomed.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <GiBirdHouse className="text-gray-700 w-35 h-34 px-4 rounded-full hover:bg-yellow-600 hover:text-white" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-black hover:text-orange-500 font-semibold text-xl">
              Top Class Facilities
            </h1>
            <span className="text-gray-500 text-md">
              Well gaudy hound hired set flailed much followed less this
              maternal well unavoidable crudely aloof more save groomed.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <GiDogHouse className="text-gray-700 w-35 h-34 px-4  rounded-full hover:bg-yellow-600 hover:text-white" />
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-black hover:text-orange-500 font-semibold text-xl">
              Easy Consultation
            </h1>
            <span className="text-gray-500 text-md">
              Well gaudy hound hired set flailed much followed less this
              maternal well unavoidable crudely aloof more save groomed.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortServiceInfo;
