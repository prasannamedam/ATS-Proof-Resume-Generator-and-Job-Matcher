const express = require("express");
const router = express.Router();

/* ---------------- STOP WORDS ---------------- */
const STOP_WORDS = new Set([
  "we", "are", "the", "and", "or", "for", "with",
  "to", "of", "a", "an", "should", "have", "has",
  "is", "in", "on", "that", "this", "as", "by"
]);

/* ---------------- NORMALIZE KEYWORDS ---------------- */
const normalizeWord = (word) => {
  return word
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/apis?$/, "api")     // api / apis → api
    .replace(/reactjs$/, "react") // reactjs → react
    .replace(/nodejs$/, "node");  // nodejs → node
};

/* ---------------- EXTRACT KEYWORDS ---------------- */
const extractKeywords = (text) => {
  if (!text) return [];

  return text
    .split(/\s+/)
    .map(normalizeWord)
    .filter(
      (word) =>
        word.length > 2 &&
        !STOP_WORDS.has(word)
    );
};

/* ---------------- ATS ANALYZER ---------------- */
router.post("/analyze", (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required"
      });
    }

    /* Job Description Keywords */
    const jdKeywords = [
      ...new Set(extractKeywords(jobDescription))
    ];

    /* Resume Keywords */
    const skillKeywords = extractKeywords(
      (resume.skills || []).join(" ")
    );

    const experienceKeywords = extractKeywords(
      (resume.experience || [])
        .map(exp => exp.description)
        .join(" ")
    );

    const summaryKeywords = extractKeywords(
      resume.summary || ""
    );

    /* ---------------- SCORING ---------------- */
    let totalScore = 0;
    let maxScore = jdKeywords.length * 3;
    let matchedKeywords = [];

    jdKeywords.forEach(keyword => {
      if (skillKeywords.includes(keyword)) {
        totalScore += 3;
        matchedKeywords.push(keyword);
      } else if (experienceKeywords.includes(keyword)) {
        totalScore += 2;
        matchedKeywords.push(keyword);
      } else if (summaryKeywords.includes(keyword)) {
        totalScore += 1;
        matchedKeywords.push(keyword);
      }
    });

    const atsScore = Math.min(
      100,
      Math.round((totalScore / maxScore) * 100)
    );

    /* ---------------- OPTION 5: MATCH LEVEL ---------------- */
    let matchLevel = "Poor Match";
    if (atsScore >= 66) {
      matchLevel = "Strong Match";
    } else if (atsScore >= 41) {
      matchLevel = "Moderate Match";
    }

    /* ---------------- MATCHED / MISSING ---------------- */
    const uniqueMatched = [...new Set(matchedKeywords)];
    const missingKeywords = jdKeywords.filter(
      word => !uniqueMatched.includes(word)
    );

    /* ---------------- OPTION 3: SUGGESTIONS ---------------- */
    const suggestions = missingKeywords
      .slice(0, 5)
      .map(
        word => `Consider adding "${word}" to your resume`
      );

    /* ---------------- RESPONSE ---------------- */
    res.json({
      atsScore,
      matchLevel,
      matchedKeywords: uniqueMatched,
      missingKeywords,
      suggestions
    });

  } catch (error) {
    console.error("ATS Analyzer Error:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

module.exports = router;
