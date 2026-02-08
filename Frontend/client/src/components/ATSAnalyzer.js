import React, { useState } from "react";
import axios from "axios";

const ATSAnalyzer = ({ resume }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeResume = async () => {
    if (!jobDescription.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await axios.post(
        "http://localhost:5000/api/ats/analyze",
        {
          resume,
          jobDescription
        }
      );

      setResult(response.data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ats-analyzer">
      <h3>ATS Resume Analyzer</h3>

      <textarea
        placeholder="Paste Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: "12px" }}
      />

      <button
        onClick={analyzeResume}
        disabled={!jobDescription.trim() || loading}
        style={{ marginBottom: "16px" }}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="ats-result">
          <h4>ATS Result</h4>

          <p>
            <strong>ATS Score:</strong> {result.atsScore}%
          </p>

          <p>
            <strong>Match Level:</strong>{" "}
           <span
  className={
    result.matchLevel === "Strong Match"
      ? "match-strong"
      : result.matchLevel === "Moderate Match"
      ? "match-moderate"
      : "match-poor"
  }
>
  {result.matchLevel}
</span>

          </p>

          <div style={{ marginTop: "12px" }}>
            <strong>Matched Keywords:</strong>
            <p>
              {result.matchedKeywords.length > 0
                ? result.matchedKeywords.join(", ")
                : "None"}
            </p>
          </div>

          <div style={{ marginTop: "12px" }}>
            <strong>Missing Keywords:</strong>
            <p>
              {result.missingKeywords.length > 0
                ? result.missingKeywords.join(", ")
                : "None"}
            </p>
          </div>

          {result.suggestions && result.suggestions.length > 0 && (
            <div style={{ marginTop: "12px" }}>
              <strong>Suggestions:</strong>
              <ul>
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSAnalyzer;
