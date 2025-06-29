import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import OverviewCard from "../components/Dashboard/OverviewCard";
import DataTable from "../components/Dashboard/DataTable";
import AddUserDataForm from "../components/Dashboard/AddUserDataForm";
import AccountTable from "../components/Dashboard/AccountTable";
// import BalanceFormModal from "../components/Dashboard/BalanceFormModal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeAccounts, setActiveAccounts] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const columns = ["name", "role", "email", "actions"];

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  // const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [totalAccounts, setTotalAccounts] = useState(0);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [usersRes, accountsRes] = await Promise.all([
        axios.get("https://banking-system-fi92.onrender.com/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://banking-system-fi92.onrender.com/api/admin/accounts", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUsers(usersRes.data.users || []);
      setTotalUsers(usersRes.data.totalUsers || 0);
      setActiveAccounts(
        accountsRes.data.accounts?.filter((acc) => acc.status === "active")
          .length || 0
      );

      setAccounts(accountsRes.data.accounts || []);
      setTotalAccounts(accountsRes.data.accounts?.length || 0);
    } catch (err) {
      console.error("Fetch failed:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const cleanUser = Object.fromEntries(
        Object.entries(newUser).filter(
          ([_, value]) => value !== undefined && value !== ""
        )
      );

      await axios.post("https://banking-system-fi92.onrender.com/api/admin/add", cleanUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      fetchData();
      setShowAddForm(false);
    } catch (err) {
      console.error("Add user failed:", err.message);
    }
  };

  const handleUpdateUser = async (id, updates) => {
    try {
      await axios.put(`https://banking-system-fi92.onrender.com/api/admin/update/${id}`, updates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchData();
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const handleChangePassword = async (id, newPassword) => {
    try {
      await axios.put(
        `https://banking-system-fi92.onrender.com/api/admin/change-password/${id}`,
        { newPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Password changed");
    } catch (err) {
      console.error("Change password failed:", err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://banking-system-fi92.onrender.com/api/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleStatusChange = async (accountId, newStatus) => {
    try {
      await axios.put(
        `https://banking-system-fi92.onrender.com/api/admin/account/status/${accountId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchData();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
        Admin Overview
      </h1>

      <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mb-6">
        <OverviewCard title="Total Users" value={totalUsers} />
        <OverviewCard title="Active Accounts" value={activeAccounts} />
      </div>

      <button
        onClick={() => setIsAddUserOpen(true)}
        className="mb-4 w-full sm:w-auto bg-blue-600 !text-white p-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer"
      >
        <span className="text-2xl">+</span> Add New User
      </button>

      {isAddUserOpen && (
        <AddUserDataForm
          onClose={() => setIsAddUserOpen(false)}
          onCreate={handleAddUser}
        />
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">User List</h2>

        <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto hover:shadow-2xl transition-all duration-300">
          <DataTable
            data={users}
            columns={columns}
            onEdit={handleUpdateUser}
            onDelete={handleDeleteUser}
            onAdd={handleAddUser}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Account List
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-4 overflow-x-auto hover:shadow-2xl transition-all duration-300">
          <AccountTable
            accounts={accounts}
            withActions={true}
            isOfficial={false}
            onRowClick={(account) => setSelectedAccount(account)}
            onChangeStatus={handleStatusChange}
          />
        </div>
      </div>

      {showAddForm && (
        <AddUserDataForm
          onSubmit={handleAddUser}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* {showBalanceModal && (
        <BalanceFormModal
          account={selectedAccount}
          onClose={() => setShowBalanceModal(false)}
          onSubmit={handleBalanceSubmit}
        />
      )} */}
    </DashboardLayout>
  );
}
