import titleIcon from "../../../assets/images/title-icon.png";
import bgImg from "../../../assets/images/pattern-2.png";
import { FaPaw } from "react-icons/fa";
import dogPinImg from "../../../assets/images/dog.png";
import { Link } from "react-router";
import { PiBoneFill } from "react-icons/pi";
import { motion } from "framer-motion";

const OurServices = () => {
  const servicesLeft = [
    {
      id: 1,
      title: "Bath & Brush",
      icon: <FaPaw className="text-yellow-500 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizly caustic poetical",
    },
    {
      id: 2,
      title: "Cleaning & Plucking",
      icon: <PiBoneFill className="text-orange-600 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizzly caustic poetical.",
    },
    {
      id: 3,
      title: "Trim & Groom",
      icon: <FaPaw className="text-yellow-500 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizly caustic poetical",
    },
  ];

  const servicesRight = [
    {
      id: 1,
      title: "Coat Handler",
      icon: <PiBoneFill className="text-orange-600 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizly caustic poetical",
    },
    {
      id: 2,
      title: "Hair Styling",
      icon: <FaPaw className="text-yellow-500 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizzly caustic poetical.",
    },
    {
      id: 3,
      title: "Teeth Brushed",
      icon: <PiBoneFill className="text-orange-600 w-8 h-8" />,
      desc: "On ordered demonstrably bucolically barring grizly caustic poetical",
    },
  ];

  return (
    <div className="container mx-auto relative mt-12">
      <img
        src={bgImg}
        alt=""
        className="w-full absolute top-0 left-0 z-0 opacity-40"
      />
      <div className="flex flex-col items-center gap-4 mb-12">
        <img src={titleIcon} alt="" />
        <h1 className="text-black text-4xl font-bold">Our Services</h1>
        <span className="text-gray-600 text-md">
          For professional dog and cat grooming needs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center">
        {/* Left Column */}


          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
          {servicesLeft.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 text-left mt-4"
            >
              <div>{item.icon}</div>
              <div className="text-black flex flex-col gap-2">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <span>{item.desc}</span>
                <Link className="text-yellow-600">See more...</Link>
              </div>
            </div>
          ))}
          </motion.div>


        {/* Midle */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img src={dogPinImg} alt="Grooming Dog" className="max-w-full h-auto drop-shadow-xl" />
        </motion.div>

        {/* Right Column */}
        <div className="mt-4">
            <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {servicesRight.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 text-left mt-4"
            >
              <div className="text-black flex flex-col text-end gap-2">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <span>{item.desc}</span>
                <Link className="text-yellow-600">See more...</Link>
              </div>
              <div>{item.icon}</div>
            </div>
          ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
