const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  principal: { type: Number, required: true },
  interestRate: { type: Number, default: 0 }, // in percent
  termMonths: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'active', 'declined', 'completed'],
    default: 'pending'
  },
  description: { type: String, default: '' }, // 🔹 Add this line
  requestedAt: { type: Date, default: Date.now },
  approvedAt: Date,
  repayments: [{
    amount: Number,
    date: { type: Date, default: Date.now },
    interestPortion: Number,
    principalPortion: Number,
    paidAt: {
      type: Date,
      default: Date.now,
    }
  }],
});

module.exports = mongoose.model('Loan', LoanSchema);
