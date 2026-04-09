import { Scissors, Home, Dog, Syringe, ClipboardList, Footprints } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      title: "Pet Grooming",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <Scissors size={40} />,
      color: "text-orange-600",
      borderColor: "border-orange-100"
    },
    {
      title: "Pet Adoption",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <Home size={40} />,
      color: "text-purple-700",
      borderColor: "border-purple-100"
    },
    {
      title: "Pet Training",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <Dog size={40} />,
      color: "text-orange-600",
      borderColor: "border-orange-100"
    },
    {
      title: "Pet Vaccination",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <Syringe size={40} />,
      color: "text-purple-700",
      borderColor: "border-purple-100"
    },
    {
      title: "Pet Day Caring",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <ClipboardList size={40} />,
      color: "text-orange-600",
      borderColor: "border-orange-100"
    },
    {
      title: "Pet Sitting/Walking",
      desc: "Abore et dolore magna aliqua ut enim minim veniam quis nostrud exercitation ullamco laboris nisi aliquip eiusmod tempor incididunt labore.",
      icon: <Footprints size={40} />,
      color: "text-purple-700",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-px w-12 bg-gray-400"></div>
            <div className="flex gap-1">
              <span className="text-purple-600">🐾</span>
            </div>
            <div className="h-px w-12 bg-gray-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            We are <span className="italic font-medium text-gray-700">Professionals</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`flex items-start gap-6 p-8 rounded-xl border bg-white/60 backdrop-blur-sm transition-transform hover:scale-[1.02] ${service.borderColor}`}
              style={{ backgroundColor: 'rgba(243, 232, 255, 0.3)' }} // Subtle purple tint from image
            >
              <div className={`${service.color} shrink-0 mt-1`}>
                {service.icon}
              </div>
              <div>
                <h3 className={`text-xl font-bold mb-3 ${service.color}`}>
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;