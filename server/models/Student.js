const mongoose = require("mongoose");

// Define the Student schema
const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    parentDetails: {
      fatherName: { type: String, required: true },
      motherName: { type: String, required: true },
      contactNumber: { type: String, required: true },
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    feesStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Pending",
    },
    libraryHistory: [
      {
        bookTitle: { type: String, required: true },
        issuedDate: { type: Date, required: true },
        returnDate: { type: Date },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
