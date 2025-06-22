import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import Header from "./Header";

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        values
      );
      message.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      message.error("Registration failed");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-6 pt-12">
        <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl relative">
          {/* Icon Header */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <UserPlus className="w-7 h-7 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-base text-gray-600 text-center mb-8">
            Register to begin banking with us
          </p>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <div className="flex gap-4">
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700">
                    Full Name
                  </span>
                }
                name="name"
                className="w-1/2"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  placeholder="Your full name"
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-700">
                    Email Address
                  </span>
                }
                name="email"
                className="w-1/2"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input
                  placeholder="you@example.com"
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700">
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                placeholder="Choose a strong password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700">Role</span>
              }
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Select user role"
                size="large"
                className="w-full text-base"
                dropdownStyle={{ fontSize: "1rem" }}
              >
                {/* <Select.Option value="admin">Admin</Select.Option> */}
                {/* <Select.Option value="official">Bank Official</Select.Option> */}
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-4 flex justify-between">
            <span className="!text-sm">Already have an account?</span>
            <button
              onClick={() => navigate("/login")}
              className="!text-blue-600 hover:!text-blue-800 hover:scale-135 !font-medium cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
