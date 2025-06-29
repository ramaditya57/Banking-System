import { Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function LoanTransactionsModal({ visible, onClose, loanId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!visible || !loanId) return;

      try {
        const res = await axios.get(
          `https://banking-system-fi92.onrender.com/api/loan/transactions/loan/${loanId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("🔴 Failed to fetch loan transactions:", err.message);
      }
    };

    fetchTransactions();
  }, [visible, loanId]);

  useEffect(() => {
    if (!visible) {
      setTransactions([]);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      title={<span className="text-xl font-semibold text-gray-800">Loan Transactions</span>}
      width={850}
      className="rounded-xl overflow-hidden"
      bodyStyle={{ maxHeight: "70vh", overflowY: "auto", padding: 0 }}
    >
      <div className="bg-white rounded-xl p-4 shadow-lg">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No transactions found for this loan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Date/Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Interest Rate (%)
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Remaining Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Total Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Paid This Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((txn) => (
                  <tr key={txn._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {moment(txn.createdAt).format("DD MMM YYYY, h:mm A")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{txn.interestRate}%</td>
                    <td className="px-6 py-4 text-sm text-gray-800">₹{txn.remainingAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">₹{txn.totalAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">₹{txn.paidAmount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{txn.description || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}
