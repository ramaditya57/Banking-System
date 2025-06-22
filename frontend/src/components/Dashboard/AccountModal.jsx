import { useState } from 'react';

export default function AccountModal({ account, onClose, onChangeBalance, onChangeStatus }) {
  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('add');
  const [description, setDescription] = useState('');

  if (!account) return null;

  const { user, accountNumber, balance, status } = account;

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }

    onChangeBalance(account._id, parsedAmount, type, description);
    setAmount('');
    setDescription('');
    setShowBalanceForm(false);
  };

  const handleStatusChange = () => {
    const newStatus = prompt('Enter new status:', status);
    if (newStatus) onChangeStatus(account._id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
          <p><span className="font-medium">Role:</span> {user?.role}</p>
          <p><span className="font-medium">Account Number:</span> {accountNumber}</p>
          <p><span className="font-medium">Balance:</span> ₹{balance}</p>
          <p><span className="font-medium">Status:</span> {status}</p>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          {/* Uncomment below buttons to enable more features */}
          {/* 
          <button
            onClick={() => setShowBalanceForm(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded text-sm"
          >
            Change Balance
          </button>

          <button
            onClick={handleStatusChange}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded text-sm"
          >
            Change Status
          </button>
          */}

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 !text-white px-4 py-1.5 rounded text-sm cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* {showBalanceForm && (
          <form onSubmit={handleBalanceSubmit} className="mt-6 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="add">Add (Credit)</option>
                <option value="deduct">Deduct (Debit)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Salary Deposit or ATM Withdrawal"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowBalanceForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )} */}
      </div>
    </div>
  );
}
