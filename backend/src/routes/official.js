const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Account = require('../models/Account');
const { verifyToken } = require('../middlewares/auth');

// Helper to generate unique 12-digit account number
async function generateUniqueAccountNumber() {
    let accountNumber;
    let exists = true;

    while (exists) {
        accountNumber = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        exists = await Account.exists({ accountNumber });
    }

    return accountNumber;
}

// ✅ GET Official Dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const official = await User.findById(req.user.id).select('-passwordHash');
        if (!official || official.role !== 'official') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const customers = await User.find({ role: 'customer' }).select('-passwordHash');
        const accounts = await Account.find().populate('user', 'name email');

        res.status(200).json({
            official,
            customers,
            totalCustomers: customers.length,
            totalAccounts: accounts.length,
            accounts,
        });
    } catch (error) {
        console.error('Official dashboard error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ✅ GET specific customer and their account
router.get('/customer/:id', verifyToken, async (req, res) => {
    try {
        const customer = await User.findById(req.params.id).select('-passwordHash');
        if (!customer || customer.role !== 'customer') {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const account = await Account.findOne({ user: customer._id });

        res.status(200).json({ customer, account });
    } catch (err) {
        console.error('Customer fetch error:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ✅ PUT Add/Deduct Balance with Transaction Logging
router.put('/balance/:accountId', verifyToken, async (req, res) => {
    try {
        let { amount, type, description } = req.body;
        amount = Number(amount);

        if (!['add', 'deduct'].includes(type)) {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        const account = await Account.findById(req.params.accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Calculate new balance
        let newBalance = account.balance;
        if (type === 'add') {
            newBalance += amount;
        } else {
            if (account.balance < amount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }
            newBalance -= amount;
        }

        // Add transaction entry
        account.transactions.push({
            type, // must be 'add' or 'deduct'
            amount,
            description,
            date: new Date()
        });

        // Update balance
        account.balance = newBalance;
        account.updatedAt = new Date();

        await account.save();

        res.json({ message: 'Balance and transaction updated successfully', account });
    } catch (err) {
        console.error("Balance update failed:", err);
        res.status(500).json({ message: 'Balance update failed', error: err.message });
    }
});



// ✅ PUT Update account status
router.put('/status/:accountId', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['active', 'inactive', 'suspended'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const account = await Account.findByIdAndUpdate(
            req.params.accountId,
            { status },
            { new: true }
        );

        if (!account) return res.status(404).json({ message: 'Account not found' });

        res.status(200).json({ message: 'Account status updated', account });
    } catch (err) {
        console.error('Status update failed:', err.message);
        res.status(500).json({ message: 'Status update failed', error: err.message });
    }
});

// ✅ POST Create a new account for a customer
router.post('/create-account/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || user.role !== 'customer') {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const existing = await Account.findOne({ user: user._id });
        if (existing) {
            return res.status(400).json({ message: 'Account already exists for this customer' });
        }

        const accountNumber = await generateUniqueAccountNumber();

        const newAccount = new Account({
            user: user._id,
            accountNumber,
            balance: 0,
            status: 'active',
        });

        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (err) {
        console.error('Account creation failed:', err.message);
        res.status(500).json({ message: 'Account creation failed', error: err.message });
    }
});

// ✅ PUT Change password for logged-in official
router.put('/change-password', verifyToken, async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const official = await User.findById(req.user.id);
        if (!official || official.role !== 'official') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        official.passwordHash = hashedPassword;
        await official.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Password change error:', err.message);
        res.status(500).json({ message: 'Password update failed', error: err.message });
    }
});


module.exports = router;
