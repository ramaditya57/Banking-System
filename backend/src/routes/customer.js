const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Account = require('../models/Account');
const { verifyToken } = require('../middlewares/auth');
const Loan = require('../models/Loan');

// GET /api/customer/dashboard
// router.get('/dashboard', verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await User.findById(userId).select('-passwordHash');
//     const accounts = await Account.find({ user: userId });

//     const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

//     res.status(200).json({
//       user,
//       accounts,
//       totalAccounts: accounts.length,
//       totalBalance
//     });
//   } catch (error) {
//     console.error('Customer dashboard error:', error.message);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });
// GET /api/customer/dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-passwordHash');
    const accounts = await Account.find({ user: userId });

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    // ✅ Add this to fetch all loans for this user
    const loans = await Loan.find({ customer: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      user,
      accounts,
      totalAccounts: accounts.length,
      totalBalance,
      loans, // ✅ Now included in the response
    });
  } catch (error) {
    console.error('Customer dashboard error:', error.message);
    res.status(500).json({ message: 'Server error', error });
  }
});


// ✅ PUT /api/customer/change-password
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { passwordHash: hashed });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error.message);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;
