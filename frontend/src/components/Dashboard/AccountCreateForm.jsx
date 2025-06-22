// src/components/Dashboard/AccountCreateForm.jsx
import { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, message, Button } from 'antd';
import axios from 'axios';

export default function AccountCreateForm({ visible, onClose, onCreate }) {
  const [customers, setCustomers] = useState([]);
  const [form] = Form.useForm();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (visible) {
      axios.get('http://localhost:4000/api/official/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setCustomers(res.data.accounts.map(acc => acc.user)); // list of customer users
      }).catch(err => console.error('Fetch customer list failed', err));
    }
  }, [visible]);

  const handleOk = () => {
    form.validateFields().then(values => {
      axios.post(`http://localhost:4000/api/official/create-account/${values.userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        message.success('Account created: ' + res.data.account.accountNumber);
        onCreate(res.data.account);
        form.resetFields();
      }).catch(err => {
        console.error('Account creation error', err);
        message.error(err.response?.data?.message || 'Creation failed');
      });
    });
  };

  return (
    <Modal
      visible={visible}
      title="Create Customer Account"
      onCancel={() => { onClose(); form.resetFields(); }}
      onOk={handleOk}
      okText="Create"
    >
      <Form form={form} layout="vertical">
        <Form.Item name="userId" label="Select Customer" rules={[{ required: true }]}>
          <Select placeholder="Select customer">
            {customers.map(u => <Select.Option key={u._id} value={u._id}>{u.name} ({u.email})</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item>
          <Input disabled placeholder="Account number will be generated automatically" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
