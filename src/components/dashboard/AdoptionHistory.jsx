import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const AdoptionHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    authApiClient.get("/adoptions/").then((res) => {
      setHistory(res.data);
    });
  }, []);


  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-md shadow-slate-300 overflow-hidden">
      <div className="p-6 border border-slate-50">
        <h3 className="text-xl font-bold text-slate-800">Adoption History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-slate-50/50 text-slate-500 uppercase text-sm">
            <tr>
              <th className="py-4">Order ID</th>
              <th>User Name</th>
              <th>Pet Name</th>
              <th>Status</th>
              <th>Order Date</th>
            </tr>
          </thead>
          
          <tbody className="text-slate-600">
            {history.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-teal-50/30 transition-colors"
              >
                <td className="font-bold text-teal-600">{item.id}</td>
                <td>{item.name}</td>
                <td className="font-medium">{item.pets.map(pet=> pet.name).join(", ")}</td>
                <td>
                  <span
                    className={`badge badge-sm font-bold py-3 px-4 rounded-lg border-none ${
                      item.status === "Completed"
                        ? "bg-teal-100 text-teal-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  {new Date(item.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {history.length === 0 && <span className="flex justify-center items-center m-6 text-slate-500">No History</span>}
      </div>
    </div>
  );
};

export default AdoptionHistory;
