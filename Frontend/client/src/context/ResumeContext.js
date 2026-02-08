import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      linkedin: ""
    },
    summary: "",
    skills: [],
    experience: [],
    projects: [],
    education: [],
    courses: [],
    declaration: "",
    layout: {
      centerName: false
    }
  });

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
