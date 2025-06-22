import React from "react";

export default function PendingLoanTable({ loans, onApprove, onDecline }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Pending Loan Requests
      </h2>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Term</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
            {loans.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-5 text-center text-gray-500 italic">
                  No pending loan requests
                </td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4 font-medium">{loan.customer?.name || "N/A"}</td>
                  <td className="px-6 py-4">{loan.customer?.email}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{loan.principal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{loan.termMonths} months</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onApprove(loan)}
                        className="bg-green-600 hover:bg-green-700 !text-white text-sm font-medium px-4 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onDecline(loan)}
                        className="bg-red-600 hover:bg-red-700 !text-white text-sm font-medium px-4 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
