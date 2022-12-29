const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    college: {
      type: String,
    },
    scores: {
      dsa: {
        type: Number,
        default: 0
      },
      web: {
        type: Number,
        default: 0
      },
      react: {
        type: Number,
        default: 0
      },
    },
    interviews: [
      {
        iid: {
          type: mongoose.Schema.Types.ObjectId,
        },
        result: {
          type: String,
        },
      },
    ],


  },
  {
    timestamps: true,
  }
);


const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
