import { Form, InputNumber, Button, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

export default function LoanRepaymentForm({ loanId, onRepaid }) {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ amount }) => {
  try {
    setLoading(true);
    const res = await axios.post(
      `http://localhost:4000/api/loan/${loanId}/repay`,
      { amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    // ✅ Success alert
    message.success(res.data.message || 'Repayment successful');
    onRepaid?.();

  } catch (err) {
    console.error(err);

    // ✅ Show specific server error
    const msg = err?.response?.data?.message || 'Repayment failed. Try again.';
    message.error(msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md mx-auto border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Make a Repayment
      </h2>

      <Form layout="vertical" onFinish={onFinish} className="space-y-4">
        <Form.Item
          name="amount"
          label={<span className="font-medium">Repay Amount</span>}
          rules={[
            { required: true, message: 'Please enter a repayment amount' },
            { type: 'number', min: 1, message: 'Must be at least ₹1' },
          ]}
        >
          <InputNumber
            min={1}
            prefix="₹"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={loading}
            className="w-full !bg-blue-600 !text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-110 hover:!bg-blue-800 transition-all duration-300"
          >
            Repay
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
