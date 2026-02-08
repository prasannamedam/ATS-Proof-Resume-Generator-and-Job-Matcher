import { useResume } from "../context/ResumeContext";

export default function ResumePreview() {
  const { resume } = useResume();

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "48px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "Georgia, serif",
        lineHeight: "1.6"
      }}
    >
      <div style={{ textAlign: resume.layout.centerName ? "center" : "left" }}>
        <h1>{resume.personalInfo.fullName || "Your Name"}</h1>
        <p>{resume.personalInfo.email} | {resume.personalInfo.phone}</p>
        <p>{resume.personalInfo.linkedin}</p>
      </div>

      <hr />

      {resume.summary && (
        <>
          <h3>Professional Summary</h3>
          <p>{resume.summary}</p>
        </>
      )}

      {resume.skills.filter(s => s.trim()).length > 0 && (
        <>
          <h3>Skills</h3>
          <p>{resume.skills.filter(s => s.trim()).join(" • ")}</p>
        </>
      )}

      {resume.experience.filter(e => e.company || e.role).length > 0 && (
        <>
          <h3>Experience</h3>
          {resume.experience
            .filter(e => e.company || e.role)
            .map((e, i) => (
              <div key={i}>
                <strong>{e.role}</strong> – {e.company}
                <div>{e.startDate} – {e.endDate}</div>
                <ul>
                  {e.description
                    ?.split("\n")
                    .filter(line => line.trim())
                    .map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                </ul>
              </div>
            ))}
        </>
      )}

      {resume.education.filter(e => e.institution).length > 0 && (
        <>
          <h3>Education</h3>
          {resume.education.map((e, i) => (
            <p key={i}>
              {e.degree} – {e.institution}
              {e.year && ` (${e.year})`}
            </p>
          ))}
        </>
      )}

      {resume.courses.filter(c => c.trim()).length > 0 && (
        <>
          <h3>Courses & Certifications</h3>
          <ul>
            {resume.courses.filter(c => c.trim()).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}

      {resume.declaration && (
        <>
          <h3>Declaration</h3>
          <p>{resume.declaration}</p>
        </>
      )}
    </div>
  );
}
