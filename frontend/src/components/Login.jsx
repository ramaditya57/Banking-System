import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import Header from "./Header";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        values
      );
      login(data.token, data.role);
      if (data.role === "admin") nav("/admin");
      else if (data.role === "official") nav("/official");
      else nav("/customer");
    } catch (err) {
      console.error("Login failed", err);
      message.error("Login failed");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Gradient Icon Header */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <LogIn className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-base text-gray-600 text-center mb-8">
            Login to access your banking dashboard
          </p>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700">
                  Email Address
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Enter a valid email",
                },
              ]}
            >
              <Input
                placeholder="e.g. john@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-700">
                  Password
                </span>
              }
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                placeholder="Your secure password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-4 flex justify-between">
            <span className="!text-sm">
              Don't have an account. Want to register?
            </span>
            <button
              onClick={() => nav("/register")}
              className="!text-blue-600 hover:!text-blue-800 hover:scale-135 !font-medium cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
