const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

/**
 * @route   POST /api/resume/save
 * @desc    Save resume to database with validation
 */
router.post("/save", async (req, res) => {
  try {
    const resume = req.body;

    /* ---------------- BASIC VALIDATION ---------------- */
    if (
      !resume.name ||
      !resume.email ||
      !resume.phone ||
      !resume.summary ||
      !resume.skills ||
      resume.skills.length === 0 ||
      !resume.experience ||
      resume.experience.length === 0 ||
      !resume.education ||
      resume.education.length === 0 ||
      !resume.declaration
    ) {
      return res.status(400).json({
        message: "All required resume fields must be filled"
      });
    }

    /* ---------------- SAVE RESUME ---------------- */
    const savedResume = new Resume(resume);
    await savedResume.save();

    res.status(201).json({
      message: "Resume saved successfully",
      resumeId: savedResume._id
    });
  } catch (error) {
    console.error("Error saving resume:", error);

    res.status(500).json({
      message: "Failed to save resume",
      error: error.message
    });
  }
});

/**
 * @route   GET /api/resume/all
 * @desc    Fetch all saved resumes (optional/debug)
 */
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resumes"
    });
  }
});

module.exports = router;
