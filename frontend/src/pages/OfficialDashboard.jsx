import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import OverviewCard from "../components/Dashboard/OverviewCard";
import AccountTable from "../components/Dashboard/AccountTable";
import AccountModal from "../components/Dashboard/AccountModal";
import BalanceFormModal from "../components/Dashboard/BalanceFormModal";
import CreateAccountForm from "../components/CreateAccountForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import PendingLoanTable from "../components/Loans/PendingLoanTable";
import ApproveLoanModal from "../components/Loans/ApproveLoanModal";
import LoanTransactionsModal from "../components/Loans/LoanTransactionsModal";
import { Modal } from "antd";

export default function OfficialDashboard() {
  const [official, setOfficial] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [loanPageVisible, setLoanPageVisible] = useState(false);
  const [loanPageUser, setLoanPageUser] = useState(null);
  const [userLoans, setUserLoans] = useState([]);
  const [loanTxnVisible, setLoanTxnVisible] = useState(false);
  const [selectedLoanUserId, setSelectedLoanUserId] = useState(null);

  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanModalVisible, setLoanModalVisible] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [selectedLoanIdForTxn, setSelectedLoanIdForTxn] = useState(null);

  const token = localStorage.getItem("token");

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/official/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setOfficial(res.data.official);
      setAccounts(res.data.accounts);
      setCustomers(res.data.customers);
      setTotalAccounts(res.data.totalAccounts);
      const total = res.data.accounts.reduce(
        (sum, acc) => sum + acc.balance,
        0
      );
      setTotalBalance(total);
    } catch (err) {
      console.error("Error fetching dashboard:", err.message);
    }
  };

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/loan", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(res.data.filter((loan) => loan.status === "pending"));
    } catch (err) {
      console.error("Failed to fetch loans:", err.message);
    }
  };

  const openLoanPage = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/loan/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserLoans(res.data || []);
      const user = customers.find((c) => c._id === userId);
      setLoanPageUser(user || null);
      setLoanPageVisible(true);
    } catch (err) {
      console.error("Error fetching user loans:", err.message);
    }
  };

  const handleApproveLoan = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/loan/${selectedLoan._id}/decision`,
        { decision: "approve", interestRate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoanModalVisible(false);
      fetchLoans();
    } catch (err) {
      console.error("Loan approval failed:", err.message);
    }
  };

  const declineLoan = async (loanId) => {
    try {
      await axios.put(
        `http://localhost:4000/api/loan/${loanId}/decision`,
        { decision: "decline" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchLoans();
    } catch (err) {
      console.error("Loan decline failed:", err.message);
    }
  };

  const updateBalanceDetails = async (accountId, amount, type, description) => {
    try {
      const amt = Math.abs(parseFloat(amount));
      if (isNaN(amt) || !["add", "deduct"].includes(type)) return;
      await axios.put(
        `http://localhost:4000/api/official/balance/${accountId}`,
        { amount: amt, type, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
      closeBalanceModal();
    } catch (err) {
      console.error(
        "Error updating balance:",
        err.response?.data || err.message
      );
    }
  };

  const updateStatus = async (accountId, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/official/status/${accountId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (err) {
      console.error(
        "Error updating status:",
        err.response?.data || err.message
      );
    }
  };

  const createAccount = async (userId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/official/create-account/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      closeCreateAccountForm();
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || "Account creation failed");
    }
  };

  const handleChangePassword = async (_, newPassword) => {
    try {
      await axios.put(
        "http://localhost:4000/api/official/change-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password changed");
    } catch (err) {
      console.error("Change password failed:", err.message);
    }
  };

  const openDetails = (account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAccount(null);
  };

  const openCreateAccountForm = () => setCreateModalOpen(true);
  const closeCreateAccountForm = () => setCreateModalOpen(false);

  const openBalanceModal = (account) => {
    setSelectedAccount(account);
    setBalanceModalOpen(true);
  };

  const closeBalanceModal = () => {
    setSelectedAccount(null);
    setBalanceModalOpen(false);
  };

  const filteredAccounts = accounts.filter((acc) =>
    acc.accountNumber.includes(searchQuery.trim())
  );

  useEffect(() => {
    fetchDashboardData();
    fetchLoans();
  }, []);

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-[#1a1f36] mb-6">
          Welcome, {official?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <OverviewCard title="Total Accounts" value={totalAccounts} />
          <OverviewCard
            title="Total Balance"
            value={`₹${totalBalance.toFixed(2)}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={openCreateAccountForm}
            className="bg-[#23395b] !text-white px-5 py-2 rounded-lg hover:bg-[#1a2a46]"
          >
            Create New Account
          </button>
          <button
            onClick={() => {
              setSelectedUserId(official?._id);
              setPasswordModalVisible(true);
            }}
            disabled={!official}
            className="bg-[#23395b] !text-white px-5 py-2 rounded-lg hover:bg-[#1a2a46] disabled:opacity-50"
          >
            Change Your Password
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by Account Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
        />

        <h2 className="text-xl font-medium text-gray-700 !mt-8 mb-4">
          Customer Accounts
        </h2>

        <AccountTable
          accounts={filteredAccounts}
          onRowClick={openDetails}
          onChangeBalance={openBalanceModal}
          onChangeStatus={updateStatus}
          withActions
          isOfficial={true}
          onViewLoan={openLoanPage}
        />

        <PendingLoanTable
          loans={loans}
          onApprove={(loan) => {
            setSelectedLoan(loan);
            setLoanModalVisible(true);
          }}
          onDecline={(loan) => declineLoan(loan._id)}
        />

        {modalOpen && selectedAccount && (
          <AccountModal
            account={selectedAccount}
            onClose={closeModal}
            onChangeStatus={updateStatus}
          />
        )}

        {balanceModalOpen && selectedAccount && (
          <BalanceFormModal
            account={selectedAccount}
            onClose={closeBalanceModal}
            onSubmit={updateBalanceDetails}
          />
        )}

        {createModalOpen && (
          <CreateAccountForm
            customers={customers}
            onClose={closeCreateAccountForm}
            onCreate={createAccount}
          />
        )}

        <ChangePasswordModal
          visible={isPasswordModalVisible}
          onClose={() => setPasswordModalVisible(false)}
          onSubmit={handleChangePassword}
          userId={selectedUserId}
        />

        <ApproveLoanModal
          visible={loanModalVisible}
          loan={selectedLoan}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          onApprove={handleApproveLoan}
          onClose={() => setLoanModalVisible(false)}
        />

        <Modal
          open={loanPageVisible}
          onCancel={() => setLoanPageVisible(false)}
          footer={null}
          title={`Loans for ${loanPageUser?.name || "User"}`}
          width={900}
        >
          <div className="p-4 bg-white rounded-xl shadow-lg">
            {userLoans.length === 0 ? (
              <p className="text-gray-500 text-center py-6">
                No loans found for this user.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                  <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Term
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userLoans.map((loan) => (
                      <tr
                        key={loan._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{loan.principal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {loan.interestRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {loan.termMonths} months
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-900">
                          {loan.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {loan.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setLoanTxnVisible(false);
                              setSelectedLoanUserId(null);
                              setSelectedLoanIdForTxn(null);
                              setTimeout(() => {
                                const userId =
                                  loan.customer?._id || loan.customer;
                                setSelectedLoanUserId(userId);
                                setSelectedLoanIdForTxn(loan._id);
                                setLoanTxnVisible(true);
                              }, 50);
                            }}
                            className="!text-blue-600 hover:text-purple-600 font-medium hover:underline transition-colors cursor-pointer"
                          >
                            View Transactions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Modal>

        {selectedLoanUserId && (
          <LoanTransactionsModal
            key={selectedLoanIdForTxn} // 👈 ensures re-render
            visible={loanTxnVisible}
            onClose={() => {
              setLoanTxnVisible(false);
              setSelectedLoanUserId(null);
              setSelectedLoanIdForTxn(null);
            }}
            loanId={selectedLoanIdForTxn}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
