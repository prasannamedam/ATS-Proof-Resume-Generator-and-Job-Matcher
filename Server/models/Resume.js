const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true }
});

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true }
});

const ResumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    summary: { type: String, required: true },

    skills: {
      type: [String],
      required: true,
      validate: v => v.length > 0
    },

    experience: {
      type: [ExperienceSchema],
      required: true,
      validate: v => v.length > 0
    },

    education: {
      type: [EducationSchema],
      required: true,
      validate: v => v.length > 0
    },

    courses: { type: [String], default: [] },

    declaration: { type: String, required: true },

    layout: {
      centerName: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
