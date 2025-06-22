import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import OverviewCard from "../components/Dashboard/OverviewCard";
import TransactionTable from "../components/Dashboard/TransactionTable";
import LoanRequestForm from "../components/Loans/LoanRequestForm";
import LoanRepaymentForm from "../components/Loans/LoanRepaymentForm";
import { Modal, Button } from "antd";

export default function CustomerDashboard() {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loan, setLoan] = useState(null);
  const [userLoans, setUserLoans] = useState([]);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);

  // For repayment modal
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const openLoanModal = () => setIsLoanModalOpen(true);
  const closeLoanModal = () => setIsLoanModalOpen(false);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/customer/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const userAccounts = res.data.accounts || [];
      const total = userAccounts.reduce((sum, acc) => sum + acc.balance, 0);

      setUser(res.data.user);
      setAccounts(userAccounts);
      setTotalBalance(total);
      setTransactions(userAccounts.flatMap((acc) => acc.transactions || []));

      const allLoans = res.data.loans || [];
      setUserLoans(allLoans);
      const activeLoan = allLoans.find((l) => l.status === "active");
      setLoan(activeLoan || null);
    } catch (err) {
      console.error("Customer dashboard fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleChangePassword = async (_, newPassword) => {
    try {
      await axios.put(
        "http://localhost:4000/api/customer/change-password",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password changed");
    } catch (err) {
      console.error("Change password failed:", err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {user?.name || "Customer"}
        </h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <OverviewCard title="Total Balance" value={`₹${totalBalance}`} />
        </div>

        <div className="my-6">
          <Button
            type="primary"
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={openLoanModal}
          >
            Request Loan
          </Button>

          {/* Modal for requesting loan */}
          <Modal
            title="Request a Loan"
            open={isLoanModalOpen}
            onCancel={closeLoanModal}
            footer={null}
            centered
          >
            <LoanRequestForm
              onRequested={() => {
                fetchDashboard();
                closeLoanModal();
              }}
            />
          </Modal>

          {/* Modal for repaying loan */}
          <Modal
            title="Repay Your Loan"
            open={isRepayModalOpen}
            onCancel={() => {
              setIsRepayModalOpen(false);
              setSelectedLoan(null);
            }}
            footer={null}
            centered
          >
            {selectedLoan && (
              <div className="space-y-2">
                <p>
                  Status: <strong>{selectedLoan.status}</strong>
                </p>
                <p>Amount: ₹{selectedLoan.principal}</p>
                <p>Interest: {selectedLoan.interestRate}%</p>
                <p>
                  Total Repayable: ₹
                  {selectedLoan.principal +
                    (selectedLoan.principal * selectedLoan.interestRate) / 100}
                </p>
                <p>
                  Remaining Balance: ₹
                  {selectedLoan.principal +
                    (selectedLoan.principal * selectedLoan.interestRate) / 100 -
                    (selectedLoan.repayments?.reduce(
                      (a, b) => a + b.amount,
                      0
                    ) || 0)}
                </p>

                <LoanRepaymentForm
                  loanId={selectedLoan._id}
                  onRepaid={() => {
                    fetchDashboard();
                    setIsRepayModalOpen(false);
                    setSelectedLoan(null);
                  }}
                />
              </div>
            )}
          </Modal>
        </div>

        {/* Loan Requests Table */}
        <div className="my-8 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Your Loan Requests
          </h2>

          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Term</th>
                  <th className="px-4 py-3">Interest Rate</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-gray-800">
                {userLoans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-6 text-center text-gray-500 italic"
                    >
                      No loan requests found
                    </td>
                  </tr>
                ) : (
                  userLoans.map((l) => (
                    <tr
                      key={l._id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-4 py-3">₹{l.principal}</td>
                      <td className="px-4 py-3">{l.termMonths} months</td>
                      <td className="px-4 py-3">
                        {l.interestRate === -1
                          ? "Declined"
                          : l.interestRate
                          ? `${l.interestRate}%`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {l.interestRate === -1 ? "declined" : l.status}
                      </td>
                      <td className="px-4 py-3">
                        {l.status === "active" ? (
                          <div className="inline-block bg-blue-50 hover:bg-blue-500 px-3 py-1 rounded-lg transition-all duration-200">
                            <button
                              onClick={() => {
                                setSelectedLoan(l);
                                setIsRepayModalOpen(true);
                              }}
                              className="text-sm !text-blue-700 hover:!text-white transition-colors cursor-pointer"
                            >
                              Repay
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <TransactionTable
            transactions={transactions}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
