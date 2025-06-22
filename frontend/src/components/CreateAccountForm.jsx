import { useState } from "react";

export default function CreateAccountForm({ customers, onCreate, onClose }) {
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a customer.");
      return;
    }
    onCreate(selectedUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create New Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
          <div>
            <label htmlFor="user" className="block font-medium mb-2">
              Select Customer
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
            >
              <option value="">-- Select --</option>
              {customers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-500 hover:!text-white rounded-lg transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold !text-white bg-blue-600 rounded-lg hover:shadow-lg transform hover:scale-105 hover:bg-blue-800 transition-all duration-300 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
