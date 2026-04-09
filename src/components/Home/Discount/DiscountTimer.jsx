import { useEffect, useState } from "react";

const DiscountTimer = () => {
  const getTargetDate = () => {
    let saved = localStorage.getItem("discount_target");

    if (!saved) {
      saved = Date.now() + 1000 * 60 * 60 * 24 * 40;
      localStorage.setItem("discount_target", saved);
    }

    return Number(saved);
  };

  const targetData = getTargetDate();

  const getTimeRemaining = () => {
    const now = Date.now();
    const difference = targetData - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-3 md:gap-4 mb-10">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        {/* Days */}
        <div className="flex flex-col p-2 bg-white rounded-box text-gray-800">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.days }}></span>
          </span>
          <span className="text-gray-600 text-sm">
            DAYS
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col p-2 bg-white rounded-box text-gray-800">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.hours }}></span>
          </span>
          <span className="text-gray-600 text-sm">
            HOURS
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col p-2 bg-white rounded-box text-gray-800">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.minutes }}></span>
          </span>
          <span className="text-gray-600 text-sm">
            MINUTES
          </span>
        </div>

        {/* Seconds (From your previous message) */}
        <div className="flex flex-col p-2 bg-white rounded-box text-gray-800">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.seconds }}></span>
          </span>
          <span className="text-gray-600 text-sm">
            SECONDS
          </span>
        </div>
      </div>

    </div>
  );
};

export default DiscountTimer;
