import { useState } from "react";

export default function BalanceFormModal({ account, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid positive amount");
      return;
    }
    onSubmit(account._id, parsedAmount, type, description);
    setAmount("");
    setDescription("");
    onClose();
  };

  if (!account) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 border border-gray-200">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Change Balance for{" "}
          <span className="text-blue-600">{account?.user?.name}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Transaction Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition cursor-pointer"
            >
              <option value="add">Add (Credit)</option>
              <option value="deduct">Deduct (Debit)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
              placeholder="e.g., Salary deposit or ATM withdrawal"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium !text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium !text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
