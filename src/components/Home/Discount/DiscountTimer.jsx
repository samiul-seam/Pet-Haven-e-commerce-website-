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
      <div className="bg-white rounded-xl w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center text-slate-800 shadow-lg">
        <span className="text-2xl md:text-3xl font-bold leading-none">
          {timeLeft.days}
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter">
          Days
        </span>
      </div>
      <div className="bg-white rounded-xl w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center text-slate-800 shadow-lg">
        <span className="text-2xl md:text-3xl font-bold leading-none">
          {timeLeft.hours}
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter">
          hrs
        </span>
      </div>
      <div className="bg-white rounded-xl w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center text-slate-800 shadow-lg">
        <span className="text-2xl md:text-3xl font-bold leading-none">
          {timeLeft.minutes}
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter">
          Min
        </span>
      </div>
      <div className="bg-white rounded-xl w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center text-slate-800 shadow-lg">
        <span className="text-2xl md:text-3xl font-bold leading-none">
          {timeLeft.seconds}
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-medium mt-1 uppercase tracking-tighter">
          sec
        </span>
      </div>
    </div>
  );
};

export default DiscountTimer;
