const AdoptItem = ({ adopt }) => {

  return (
    <div>
      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 mb-6">
        <p className="text-teal-600">
          <span className="font-semibold">Name:</span> {adopt.name}
        </p>

        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {adopt.phone_number || "N/A"}
        </p>

        <p>
          <span className="font-semibold">Address:</span> {adopt.address}
        </p>

        <p>
          <span className="font-semibold">Adoption ID:</span> {adopt.id}
        </p>

        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(adopt.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Pets */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Adopted Pet</h3>

        <div className="space-y-3">
          {adopt?.pets?.map((pet) => (
            <div
              key={pet.id}
              className="flex justify-between items-center bg-cyan-100 rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-800">{pet.name}</p>
                <p className="text-xs text-gray-500">
                  {pet.category_name} • {pet.breed}
                </p>
              </div>

              <p className="font-semibold text-teal-700">৳ {pet.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdoptItem;
