import React from "react";

export default function ApproveLoanModal({
  visible,
  loan,
  interestRate,
  setInterestRate,
  onApprove,
  onClose,
}) {
  if (!visible || !loan) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
          Approve Loan Request
        </h3>

        <div className="text-sm text-gray-700 space-y-2 mb-6">
          <p>
            <strong>Customer:</strong> {loan.customer?.name || "N/A"}
          </p>
          <p>
            <strong>Amount:</strong> ₹{loan.principal}
          </p>
          <p>
            <strong>Term:</strong> {loan.termMonths} months
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 shadow-sm"
            placeholder="Enter interest rate"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-500 hover:bg-gray-800 hover:!text-white rounded-lg transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onApprove}
            className="px-4 py-2 text-sm font-medium !text-white bg-blue-600 hover:bg-blue-800 rounded-lg transition shadow-md cursor-pointer"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
