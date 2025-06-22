import { useState } from "react";

export default function AccountTable({
  accounts,
  onRowClick,
  withActions = false,
  isOfficial,
  onChangeBalance,
  onChangeStatus,
  onViewLoan,
}) {
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statuses = ["active", "inactive", "suspended"];

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-3 font-semibold text-left">Name</th>
            <th className="px-6 py-3 font-semibold text-left">Account Number</th>
            <th className="px-6 py-3 font-semibold text-left">Balance</th>
            <th className="px-6 py-3 font-semibold text-left">Status</th>
            {withActions && (
              <th className="px-6 py-3 font-semibold text-left">Actions</th>
            )}
            {isOfficial && (
              <th className="px-6 py-3 font-semibold text-left">Loan</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
          {accounts.map((acc) => (
            <tr
              key={acc._id}
              onClick={() => onRowClick(acc)}
              className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              <td className="px-6 py-4">{acc.user?.name || "N/A"}</td>
              <td className="px-6 py-4">{acc.accountNumber}</td>
              <td className="px-6 py-4 font-semibold text-green-600">
                ₹{acc.balance.toFixed(2)}
              </td>
              <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                {editingStatusId === acc._id ? (
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setEditingStatusId(null);
                      onChangeStatus(acc._id, newStatus);
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="capitalize">{acc.status}</span>
                )}
              </td>

              {withActions && (
                <td
                  className="px-4 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-wrap gap-3 text-sm">
                    {isOfficial && (
                      <button
                        onClick={() => onChangeBalance(acc)}
                        className="text-green-600 font-medium hover:underline transition"
                      >
                        💰 Balance
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setEditingStatusId(acc._id);
                        setSelectedStatus(acc.status);
                      }}
                      className="text-blue-600 font-medium hover:underline transition"
                    >
                      🚦 Status
                    </button>
                  </div>
                </td>
              )}

              {isOfficial && (
                <td
                  className="px-6 py-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {acc.user && (
                    <button
                      onClick={() => onViewLoan(acc.user._id)}
                      className="!text-blue-600 font-medium cursor-pointer hover:scale-120 transition"
                    >
                      View Loan
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
