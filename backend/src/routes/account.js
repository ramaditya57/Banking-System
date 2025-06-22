const router = require('express').Router();
const Account = require('../models/Account');
const auth = require('../middlewares/auth');

// Apply authentication middleware
router.use(auth.verifyToken);

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.json(accounts);
  } catch (e) { next(e) }
});

// Get all accounts (admin only)
router.get('/all', async (req, res, next) => {
  try {
    // optionally check role if needed:
    // if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const accounts = await Account.find()
      .populate('user', 'name email role image')
      .sort({ createdAt: -1 });

    res.json(accounts);
  } catch (e) {
    next(e);
  }
});

// Update account status
router.put('/update/:id', async (req, res, next) => {
  try {
    const { status } = req.body;

    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!account) return res.status(404).json({ error: 'Account not found' });

    res.json({ message: 'Status updated', account });
  } catch (e) {
    next(e);
  }
});

router.post('/deposit', async (req, res, next) => {
  try {
    const { accountId, amount } = req.body;
    const account = await Account.findById(accountId);
    if (!account || account.user.toString() !== req.user.id) return res.status(403).end();
    account.balance += amount;
    await account.save();
    res.json(account);
  } catch (e) { next(e) }
});

module.exports = router;
