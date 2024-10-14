const mongoose = require("mongoose");

const feesHistorySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Bank Transfer", "Other"],
      required: true,
    },
    feesStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      required: true,
      default: "Pending",
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const FeesHistory = mongoose.model("FeesHistory", feesHistorySchema);

module.exports = FeesHistory;
