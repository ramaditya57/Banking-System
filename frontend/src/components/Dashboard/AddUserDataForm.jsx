import React from "react";
import { Form, Input, Modal, Select } from "antd";

const AddUserDataForm = ({ onClose, onCreate }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        onClose();
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation failed:", info);
      });
  };

  return (
    <Modal
      open
      title={
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Add New User
        </span>
      }
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Add User"
      cancelText="Cancel"
      maskClosable={false}
      centered
      className="rounded-xl w-[95%] max-w-[500px]"
    >
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 gap-y-4 sm:gap-y-5"
      >
        <Form.Item
          label={<span className="text-blue-900 font-medium">Name</span>}
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
        </Form.Item>

        <Form.Item
          label={<span className="text-blue-900 font-medium">Role</span>}
          name="role"
          rules={[{ required: true, message: "Please enter the role" }]}
        >
          <Select
            placeholder="Select a role"
            className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            classNames={{
              popup: "rounded-lg",
            }}
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="official">Bank Official</Select.Option>
            <Select.Option value="customer">Customer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className="text-blue-900 font-medium">Email</span>}
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
        </Form.Item>

        <Form.Item
          label={<span className="text-blue-900 font-medium">Password</span>}
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-blue-900 font-medium">
              Image URL (optional)
            </span>
          }
          name="image"
        >
          <Input
            placeholder="https://example.com/image.jpg"
            className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserDataForm;
