const Card = ({ feature }) => {
  return (
    <div>
      <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
        {feature.icon}
      </div>
      <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
    </div>
  );
};

export default Card;
