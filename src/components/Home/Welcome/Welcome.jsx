import { FaRegCircleDot } from "react-icons/fa6";
import welcomeImg from "../../../assets/images/welcome.jpg";
import { motion } from "framer-motion";
 
const Welcome = () => {
  return (
    <div className="container mx-auto px-20 mt-8">
      <div className="flex flex-col justify-center items-center gap-3">
        <span className="font-sm text-gray-500 mt-4">
          Because We Really Care About Your Pets
        </span>
        <span className="font-bold text-4xl text-black">
          Welcome to PetHaven
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Imgae  */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img src={welcomeImg} alt="welcomeImage" className="w-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col justify-between"
        >
          <div>
            <span className="text-sm text-gray-500">
              Broadcast neglectful and poignantly well until and some listlessly
              amidst suc cessful concentrically ably dachshund more far but
              forwardly echidna outside tiger split thanks far vibrantly gosh
              hence pangolin however notwithstanding leapt untruthful gauchely
              yikes komodo dully more.
            </span>
            <h2 className="text-sm text-gray-500 mt-8">
              As abandoned winced this more far wow jeepers near more wow
              goodness so revealed much along worm some grasshopper.
            </h2>
          </div>
          <div className="text-gray-500 mt-4">
            <div className="flex items-center gap-2">
              <FaRegCircleDot className="text-orange-500" />
              <span className="text-md font-semibold">
                Abore et dolore magna aliqua ut enim veniam
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCircleDot className="text-orange-500" />
              <span className="text-md font-semibold">
                Quis nostrud exercitation ullamco laboris nisi aliquip
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCircleDot className="text-orange-500" />
              <span className="text-md font-semibold">
                Eiusmod tempor incididunt labore.
              </span>
            </div>
          </div>
          <div className="bg-yellow-600/80 text-center font-semibold text-white hover:bg-white hover:text-yellow-500 border-2 hover:border-yellow-500 px-4 py-4 w-50 rounded-full mt-8">
            VIEW OUR SERVICES
          </div>
        </motion.div>
        <div></div>
      </div>
    </div>
  );
};

export default Welcome;
