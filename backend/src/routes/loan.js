const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Loan = require('../models/Loan');
const { verifyToken } = require('../middlewares/auth');
const Account = require('../models/Account');

// POST /api/loan/request - Customer requests a loan
router.post('/request', verifyToken, async (req, res) => {
  try {
    const { principal, termMonths } = req.body;

    if (!principal || principal <= 0 || !termMonths || termMonths <= 0) {
      return res.status(400).json({ message: 'Principal and termMonths must be valid positive numbers' });
    }

    const loan = new Loan({
      customer: req.user.id,
      principal,
      termMonths,
      status: 'pending',
    });

    await loan.save();
    res.status(201).json({ message: 'Loan request submitted', loan });
  } catch (err) {
    console.error('🔴 Loan request error:', err);
    res.status(500).json({ message: 'Failed to request loan', error: err.message });
  }
});

// GET /api/loan - Official views all loans
router.get('/', verifyToken, async (req, res) => {
  try {
    const loans = await Loan.find().populate('customer', 'name email');
    res.json(loans);
  } catch (err) {
    console.error('🔴 Fetch loans error:', err);
    res.status(500).json({ message: 'Failed to fetch loans', error: err.message });
  }
});

// PUT /api/loan/:loanId/decision - Approve or Decline Loan
router.put('/:loanId/decision', verifyToken, async (req, res) => {
  try {
    const { decision, interestRate } = req.body;
    const loan = await Loan.findById(req.params.loanId);

    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    if (decision === 'approve') {
      if (interestRate == null || interestRate < 0) {
        return res.status(400).json({ message: 'Interest rate is required to approve' });
      }

      loan.status = 'active';
      loan.interestRate = interestRate;
      loan.approvedAt = new Date();
    } else if (decision === 'decline') {
      loan.status = 'declined';
    } else {
      return res.status(400).json({ message: 'Invalid decision' });
    }

    await loan.save();
    res.json({ message: `Loan ${decision}d`, loan });
  } catch (err) {
    console.error('🔴 Decision error:', err);
    res.status(500).json({ message: 'Failed to update loan', error: err.message });
  }
});

// GET /api/loan/user/:userId - Fetch all loans of a user
router.get('/user/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const loans = await Loan.find({ customer: userId }).sort({ createdAt: -1 });

    res.json(loans);
  } catch (err) {
    console.error("🔴 Failed to fetch user loans:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/loan/:userId/transactions - View all loan repayments of a user
// router.get('/:userId/transactions', verifyToken, async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const loans = await Loan.find({ customer: userId, status: { $in: ['active', 'completed'] } });

//     const transactions = [];

//     loans.forEach((loan) => {
//       const totalLoanAmount = loan.principal + (loan.principal * loan.interestRate / 100);
//       let paidSoFar = 0;

//       loan.repayments.forEach((repayment) => {
//         paidSoFar += repayment.amount;
//         const remainingAmount = totalLoanAmount - paidSoFar;

//         transactions.push({
//           loanId: loan._id,
//           paidAmount: repayment.amount,
//           interestRate: loan.interestRate,
//           totalAmount: totalLoanAmount,
//           remainingAmount,
//           createdAt: repayment.createdAt || loan.updatedAt, // Fallback to loan updatedAt if not set
//         });
//       });
//     });

//     res.json(transactions);
//   } catch (err) {
//     console.error('🔴 Fetch loan transactions error:', err);
//     res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
//   }
// });

router.get('/transactions/user/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const loans = await Loan.find({ customer: userId, status: { $in: ['active', 'completed'] } });

    const transactions = [];

    loans.forEach((loan) => {
      const totalLoanAmount = loan.principal + (loan.principal * loan.interestRate / 100);
      let paidSoFar = 0;

      loan.repayments.forEach((repayment,i) => {
        paidSoFar += repayment.amount;
        const remainingAmount = totalLoanAmount - paidSoFar;

        transactions.push({
          _id: `${loan._id.toString()}-${i}`,
          loanId: loan._id,
          paidAmount: repayment.amount,
          interestRate: loan.interestRate,
          totalAmount: totalLoanAmount,
          remainingAmount,
          createdAt: repayment.createdAt || loan.updatedAt, // Fallback to loan updatedAt if not set
        });
      });
    });

    res.json(transactions);
  } catch (err) {
    console.error('🔴 Fetch loan transactions error:', err);
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
});

// POST /api/loan/:loanId/repay - Customer repays installment
router.post('/:loanId/repay', verifyToken, async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(loanId)) {
      return res.status(400).json({ message: 'Invalid loan ID format' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Repayment amount must be a positive number' });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    if (loan.status !== 'active') return res.status(400).json({ message: 'Loan is not active' });

    const account = await Account.findOne({ user: req.user.id });
    if (!account) return res.status(404).json({ message: 'Account not found' });

    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance for repayment' });
    }

    account.balance -= amount;
    await account.save();

    loan.repayments = loan.repayments || [];
    const totalPaid = loan.repayments.reduce((sum, rep) => sum + rep.amount, 0);
    const totalDue = loan.principal + (loan.principal * loan.interestRate / 100);
    const remaining = totalDue - totalPaid;

    const interestPortion = remaining * (loan.interestRate / 100) / loan.termMonths;
    const principalPortion = amount - interestPortion;

    loan.repayments.push({
      amount,
      interestPortion,
      principalPortion,
    });

    if (totalPaid + amount >= totalDue) {
      loan.status = 'completed';
    }

    await loan.save();

    res.json({
      message: 'Repayment successful. Amount deducted from your account.',
      loan,
      accountBalance: account.balance
    });

  } catch (err) {
    console.error('🔴 Repayment error:', err);
    res.status(500).json({ message: 'Failed to process repayment', error: err.message });
  }
});

// GET /api/loan/transactions/loan/:loanId - Fetch transactions of a specific loan
router.get('/transactions/loan/:loanId', verifyToken, async (req, res) => {
  try {
    const { loanId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(loanId)) {
      return res.status(400).json({ message: "Invalid loan ID format" });
    }

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    if (!["active", "completed"].includes(loan.status)) {
      return res.status(400).json({ message: "Loan is not active or completed" });
    }

    const totalLoanAmount = loan.principal + (loan.principal * loan.interestRate / 100);
    let paidSoFar = 0;

    const transactions = loan.repayments.map((repayment, index) => {
      paidSoFar += repayment.amount;
      return {
        _id: `${loan._id.toString()}-${index}`,
        loanId: loan._id,
        paidAmount: repayment.amount,
        interestRate: loan.interestRate,
        totalAmount: totalLoanAmount,
        remainingAmount: totalLoanAmount - paidSoFar,
        description: repayment.description || "N/A",
        createdAt: repayment.createdAt || loan.updatedAt,
      };
    });

    res.json(transactions);
  } catch (err) {
    console.error("🔴 Fetch loan transactions (by loanId) error:", err);
    res.status(500).json({ message: "Failed to fetch transactions", error: err.message });
  }
});


module.exports = router;
