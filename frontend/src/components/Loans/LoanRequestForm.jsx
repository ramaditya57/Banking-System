import { Form, InputNumber, Button, message } from 'antd';
import axios from 'axios';

export default function LoanRequestForm({ onRequested }) {
  const onFinish = async (vals) => {
    try {
      await axios.post(
        'https://banking-system-fi92.onrender.com/api/loan/request',
        vals,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      message.success('Loan requested!');
      onRequested();
    } catch (err) {
      message.error('Loan request failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full mx-auto border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Request a New Loan
      </h2>

      <Form
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4 text-gray-700"
      >
        <Form.Item
          name="principal"
          label={<span className="font-medium">Amount</span>}
          rules={[{ required: true, message: 'Please enter a loan amount' }]}
        >
          <InputNumber
            min={500}
            step={500}
            prefix="₹"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          name="termMonths"
          label={<span className="font-medium">Term (months)</span>}
          rules={[{ required: true, message: 'Please specify term duration' }]}
        >
          <InputNumber
            min={1}
            // max={60}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full !bg-blue-600 !text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-110 hover:!bg-blue-800 transition-all duration-300"
          >
            Request Loan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
