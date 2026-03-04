import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const AdoptionHistory = () => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    authApiClient
      .get("/adoptions/")
      .then((res) => {
        setHistory(res.data);
      })
      .catch(() => setHistory([])); 
  }, []);

  if (history === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-xl text-info"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-md shadow-slate-300 overflow-hidden">
      <div className="p-6 border border-slate-50">
        <h3 className="text-xl font-bold text-slate-800">Adoption History</h3>
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col justify-center items-center m-10 text-slate-500">
          <p>No adoption history found.</p>
        </div>
      ) : (
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
            {/* 3. Tbody is now INSIDE the table tag */}
            <tbody className="text-slate-600">
              {history.map((item) => (
                <tr
                  key={item?.id}
                  className="hover:bg-teal-50/30 transition-colors"
                >
                  <td className="font-bold text-teal-600">{item?.id}</td>
                  <td>{item?.name}</td>
                  <td className="font-medium">
                    {item?.pets?.map((pet) => pet?.name).join(", ")}
                  </td>
                  <td>
                    <span
                      className={`badge badge-sm font-bold py-3 px-4 rounded-lg border-none ${
                        item?.status === "Completed"
                          ? "bg-teal-100 text-teal-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td>
                    {item?.created_at
                      ? new Date(item.created_at).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdoptionHistory;
