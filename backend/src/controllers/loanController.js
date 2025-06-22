const approveLoan = async (req, res) => {
  const { loanId } = req.params;
  const { interestRate } = req.body;

  if (!interestRate || interestRate <= 0) {
    return res.status(400).json({ error: "Invalid interest rate" });
  }

  const loan = await Loan.findById(loanId);
  if (!loan) return res.status(404).json({ error: "Loan not found" });

  loan.status = "approved";
  loan.interestRate = interestRate;
  await loan.save();

  res.json({ message: "Loan approved successfully", loan });
};
