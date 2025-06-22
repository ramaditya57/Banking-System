import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

export default function TransactionTable({ transactions, onChangePassword }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();

  const handlePasswordSubmit = async () => {
    try {
      const { newPassword } = await form.validateFields();
      onChangePassword(null, newPassword);
      setPasswordVisible(false);
      form.resetFields();
    } catch (err) {
      console.error("Password form validation failed:", err);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
        <button
          className="bg-blue-600 !text-white px-5 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 hover:bg-blue-800 transition-all duration-300"
          onClick={() => setPasswordVisible(true)}
        >
          Change Password
        </button>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500 italic">
                  No transactions found.
                </td>
              </tr>
            ) : (
              [...transactions]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((tx, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{tx.description || "—"}</td>
                    <td className="px-6 py-4 capitalize">{tx.type}</td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        tx.type === "add"
                          ? "text-green-600"
                          : tx.type === "deduct"
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                    >
                      ₹{tx.amount}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Changing Password */}
      <Modal
        open={passwordVisible}
        title={
          <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
        }
        onCancel={() => setPasswordVisible(false)}
        onOk={handlePasswordSubmit}
        okText="Change"
        okButtonProps={{
          className:
            "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-transform duration-300",
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="newPassword"
            label={
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
            }
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password
              placeholder="Enter new password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
