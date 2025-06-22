const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Account = require('../models/Account');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const router = express.Router();

// 🔐 Middleware: protect all admin routes
router.use(verifyToken, isAdmin);

// 📌 Get all user details
router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const roles = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalUsers: users.length,
      usersByRole: roles,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.find()
      .populate('user', 'name email role image')
      .sort({ createdAt: -1 });

    res.json({ accounts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});


// ➕ Add a new user
router.post('/add', async (req, res) => {
  try {
    const { name, email, password, role, image } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword, // ✅ correct
      role,
      image: image || null
    });

    const saved = await newUser.save();
    console.log("✅ User created:", saved);

    res.status(201).json({ message: "User created", user: saved });

  } catch (err) {
    console.error("🔥 Backend error while adding user:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      stack: err.stack
    });
  }
});



// ✏️ Update user details
router.put('/update/:id', async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Don't allow password updates here

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
});

// ❌ Delete user
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Delete failed', details: err.message });
//   }
// });

router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Delete related accounts
    await Account.deleteMany({ user: userId });

    res.json({ message: 'User and related accounts deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
});

router.put('/account/balance/:accountId', async (req, res) => {
  try {
    let { amount, type, description } = req.body;
    amount = Number(amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!['add', 'deduct'].includes(type)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }

    const account = await Account.findById(req.params.accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    // Deduct validation
    if (type === 'deduct' && account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Calculate new balance
    account.balance = type === 'add'
      ? account.balance + amount
      : account.balance - amount;

    // Add transaction log
    account.transactions.push({
      type,
      amount,
      description: description || (type === 'add' ? 'Admin deposit' : 'Admin withdrawal'),
      date: new Date()
    });

    await account.save();

    res.status(200).json({ message: 'Balance and transaction updated successfully', account });
  } catch (err) {
    console.error("Admin balance update error:", err);
    res.status(500).json({ message: 'Balance update failed', error: err.message });
  }
});


router.put('/account/status/:accountId', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['active', 'inactive', 'suspended'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid account status' });
    }

    const account = await Account.findByIdAndUpdate(
      req.params.accountId,
      { status },
      { new: true }
    );

    if (!account) return res.status(404).json({ message: 'Account not found' });

    res.status(200).json({ message: 'Account status updated', account });
  } catch (err) {
    console.error('Admin status update failed:', err.message);
    res.status(500).json({ message: 'Status update failed', error: err.message });
  }
});


module.exports = router;
