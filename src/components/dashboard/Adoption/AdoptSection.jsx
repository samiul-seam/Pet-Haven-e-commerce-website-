import useAuthContext from "../../../hooks/useAuthContext";
import AdoptCard from "./AdoptCard";

const AdoptSection = ({ adoption, onCancel }) => {
  const { user } = useAuthContext();
  
  return (
    <div>
      <div>
        {adoption.map((adopt) => (
          <div key={adopt.id} className="mb-7">
            <div className="border border-gray-500 mb-6"></div>
            <AdoptCard adopt={adopt} user={user} onCancel={onCancel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdoptSection;
