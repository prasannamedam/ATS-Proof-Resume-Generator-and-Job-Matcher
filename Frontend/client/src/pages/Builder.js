import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import ATSAnalyzer from "../components/ATSAnalyzer";
import { useResume } from "../context/ResumeContext";

export default function Builder() {
  const { resume } = useResume(); // ✅ CORRECT WAY

  return (
    <div className="builder-container">
      <div className="form-panel">
        <ResumeForm />

        {/* Visual separation between Form & ATS */}
        <div className="section-divider" />

        <div style={{ marginTop: "32px" }}>
          {/* ✅ PASS RESUME TO ATS */}
          <ATSAnalyzer resume={resume} />
        </div>
      </div>

      <div className="preview-panel">
        <ResumePreview />
      </div>
    </div>
  );
}
