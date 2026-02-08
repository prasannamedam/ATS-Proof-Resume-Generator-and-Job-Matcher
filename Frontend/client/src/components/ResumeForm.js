import { useResume } from "../context/ResumeContext";

export default function ResumeForm() {
  const { resume, setResume } = useResume();

  const handlePersonalChange = (e) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [e.target.name]: e.target.value
      }
    });
  };

  const saveResume = async () => {
    await fetch("http://localhost:5000/api/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resume)
    });
    alert("Resume saved successfully");
  };

  return (
    <>
      <h2>Resume Builder</h2>

      {/* PERSONAL INFO */}
      <div className="card">
        <h3>Personal Information</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input name="fullName" onChange={handlePersonalChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" onChange={handlePersonalChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" onChange={handlePersonalChange} />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input name="linkedin" onChange={handlePersonalChange} />
        </div>

        <label>
          <input
            type="checkbox"
            onChange={(e) =>
              setResume({
                ...resume,
                layout: { ...resume.layout, centerName: e.target.checked }
              })
            }
          />{" "}
          Center name at top of resume
        </label>
      </div>

      {/* SUMMARY */}
      <div className="card">
        <h3>Professional Summary</h3>
        <textarea
          className="textarea-large"
          placeholder="Write a concise professional summary"
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        />
      </div>

      {/* SKILLS */}
      <div className="card">
        <h3>Skills</h3>

        <div className="skills-grid">
          {resume.skills.map((skill, i) => (
            <input
              key={i}
              placeholder="Skill"
              value={skill}
              onChange={(e) => {
                const updated = [...resume.skills];
                updated[i] = e.target.value;
                setResume({ ...resume, skills: updated });
              }}
            />
          ))}
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: "12px" }}
          onClick={() =>
            setResume({ ...resume, skills: [...resume.skills, ""] })
          }
        >
          + Add Skill
        </button>
      </div>

      {/* EXPERIENCE */}
      <div className="card">
        <h3>Experience</h3>

        {resume.experience.map((exp, i) => (
          <div className="sub-card" key={i}>
            <div className="exp-row">
              <input
                placeholder="Company"
                onChange={(e) => {
                  const arr = [...resume.experience];
                  arr[i].company = e.target.value;
                  setResume({ ...resume, experience: arr });
                }}
              />
              <input
                placeholder="Role"
                onChange={(e) => {
                  const arr = [...resume.experience];
                  arr[i].role = e.target.value;
                  setResume({ ...resume, experience: arr });
                }}
              />
            </div>

            <div className="exp-row">
              <input
                placeholder="Start Date"
                onChange={(e) => {
                  const arr = [...resume.experience];
                  arr[i].startDate = e.target.value;
                  setResume({ ...resume, experience: arr });
                }}
              />
              <input
                placeholder="End Date"
                onChange={(e) => {
                  const arr = [...resume.experience];
                  arr[i].endDate = e.target.value;
                  setResume({ ...resume, experience: arr });
                }}
              />
            </div>

            <textarea
              className="textarea-large"
              placeholder="Describe your responsibilities (one point per line)"
              onChange={(e) => {
                const arr = [...resume.experience];
                arr[i].description = e.target.value;
                setResume({ ...resume, experience: arr });
              }}
            />
          </div>
        ))}

        <button
          className="btn btn-primary"
          onClick={() =>
            setResume({
              ...resume,
              experience: [
                ...resume.experience,
                { company: "", role: "", startDate: "", endDate: "", description: "" }
              ]
            })
          }
        >
          + Add Experience
        </button>
      </div>

      {/* EDUCATION */}
      <div className="card">
        <h3>Education</h3>

        {resume.education.map((edu, i) => (
          <div className="sub-card" key={i}>
            <input
              placeholder="Institution"
              onChange={(e) => {
                const arr = [...resume.education];
                arr[i].institution = e.target.value;
                setResume({ ...resume, education: arr });
              }}
            />
            <input
              placeholder="Degree"
              onChange={(e) => {
                const arr = [...resume.education];
                arr[i].degree = e.target.value;
                setResume({ ...resume, education: arr });
              }}
            />
            <input
              placeholder="Year"
              onChange={(e) => {
                const arr = [...resume.education];
                arr[i].year = e.target.value;
                setResume({ ...resume, education: arr });
              }}
            />
          </div>
        ))}

        <button
          className="btn btn-primary"
          onClick={() =>
            setResume({
              ...resume,
              education: [...resume.education, { institution: "", degree: "", year: "" }]
            })
          }
        >
          + Add Education
        </button>
      </div>

      {/* COURSES */}
      <div className="card">
        <h3>Courses & Certifications</h3>

        {resume.courses.map((course, i) => (
          <input
            key={i}
            placeholder="Course / Certification"
            onChange={(e) => {
              const arr = [...resume.courses];
              arr[i] = e.target.value;
              setResume({ ...resume, courses: arr });
            }}
          />
        ))}

        <button
          className="btn btn-primary"
          onClick={() =>
            setResume({ ...resume, courses: [...resume.courses, ""] })
          }
        >
          + Add Course
        </button>
      </div>

      {/* DECLARATION */}
      <div className="card">
        <h3>Declaration</h3>
        <textarea
          className="textarea-medium"
          placeholder="I hereby declare that the above information is true."
          onChange={(e) =>
            setResume({ ...resume, declaration: e.target.value })
          }
        />
      </div>

      <button className="btn btn-success" onClick={saveResume}>
        Save Resume
      </button>
    </>
  );
}
