import React, { useState } from "react";
import "./App.css";
import SearchJobs from "./components/SearchJobs";
import SearchJobsBySkill from "./components/SearchJobsBySkill";
import SearchSkills from "./components/SearchSkills";
import SearchSkillsByJob from "./components/SearchSkillsByJob";

function App() {
  const [searchBy, setSearchBy] = useState("jobs"); // jobs, skills, skillsByJob, jobsBySkill

  return (
    <div className="App">
      <div className="header">
        <h1>Workforce Data Initiative</h1>
        <p>
          Welcome to the Workforce Data Initiative Skills and Job search!
          <br /> Select how you'd like to search the database below, and get
          cracking!
        </p>
        <div className="button-container">
          <button
            className={`button ${searchBy === "jobs" && "selected"}`}
            onClick={() => setSearchBy("jobs")}
          >
            Search Jobs
          </button>
          <button
            className={`button ${searchBy === "skills" && "selected"}`}
            onClick={() => setSearchBy("skills")}
          >
            Search Skills
          </button>
          <button
            className={`button ${searchBy === "skillsByJob" && "selected"}`}
            onClick={() => setSearchBy("skillsByJob")}
          >
            Search Skills by Job
          </button>
          <button
            className={`button ${searchBy === "jobsBySkill" && "selected"}`}
            onClick={() => setSearchBy("jobsBySkill")}
          >
            Search Jobs by Skill
          </button>
        </div>
      </div>
      {searchBy === "jobs" && <SearchJobs />}
      {searchBy === "skills" && <SearchSkills />}
      {searchBy === "skillsByJob" && <SearchSkillsByJob />}
      {searchBy === "jobsBySkill" && <SearchJobsBySkill />}
    </div>
  );
}

export default App;
