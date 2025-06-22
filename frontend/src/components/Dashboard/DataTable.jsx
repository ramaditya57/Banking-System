import React, { useState } from "react";
import { Modal, Form, Input, Button, Space } from "antd";

export default function DataTable({ data, columns, onEdit, onDelete, onAdd, onChangePassword }) {
  const [editVisible, setEditVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const openEditModal = (user) => {
    setSelectedUser(user);
    editForm.setFieldsValue(user);
    setEditVisible(true);
  };

  const openPasswordModal = (user) => {
    setSelectedUser(user);
    passwordForm.resetFields();
    setPasswordVisible(true);
  };

  const handleEditSubmit = () => {
    editForm.validateFields().then((values) => {
      onEdit(selectedUser._id, values);
      setEditVisible(false);
      setSelectedUser(null);
    });
  };

  const handlePasswordSubmit = () => {
    passwordForm.validateFields().then(({ newPassword }) => {
      onChangePassword(selectedUser._id, newPassword);
      setPasswordVisible(false);
      setSelectedUser(null);
    });
  };

  return (
    <>
      <table className="w-full border-collapse mt-4 bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white uppercase text-xs tracking-wider text-left">
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 border-b border-blue-700">
                {col.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-blue-50 text-sm text-gray-800 transition-colors duration-200"
            >
              {columns.map((col) =>
                col === "actions" ? (
                  <td key="actions" className="px-4 py-2 border-b border-gray-200">
                    <Space>
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-blue-600 font-medium hover:underline transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-600 font-medium hover:underline transition"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => openPasswordModal(item)}
                        className="text-yellow-600 font-medium hover:underline transition"
                      >
                        🔒 Change Password
                      </button>
                    </Space>
                  </td>
                ) : (
                  <td key={col} className="px-4 py-2 border-b border-gray-200">
                    {item[col]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      <Modal
        open={editVisible}
        title={<span className="text-xl font-semibold text-gray-800">Edit User</span>}
        onCancel={() => setEditVisible(false)}
        onOk={handleEditSubmit}
        okText="Update"
        okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700 text-white rounded-md' }}
        cancelButtonProps={{ className: 'rounded-md' }}
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input className="rounded-md bg-gray-50 border border-gray-300" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please enter the role" }]}
          >
            <Input className="rounded-md bg-gray-50 border border-gray-300" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input className="rounded-md bg-gray-50 border border-gray-300" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        open={passwordVisible}
        title={
          <span className="text-xl font-semibold text-gray-800">
            Change Password for {selectedUser?.name}
          </span>
        }
        onCancel={() => setPasswordVisible(false)}
        onOk={handlePasswordSubmit}
        okText="Change"
        okButtonProps={{ className: 'bg-blue-600 hover:bg-blue-700 text-white rounded-md' }}
        cancelButtonProps={{ className: 'rounded-md' }}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter the new password" }]}
          >
            <Input.Password className="rounded-md bg-gray-50 border border-gray-300" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
