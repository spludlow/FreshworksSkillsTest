import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { useSearchJobsQuery } from "./features/jobSkills/job-skills-api-slice";
import "./App.css";
import SearchJobs from "./SearchJobs";

function App() {
  const [searchBy, setSearchBy] = useState("jobs"); // jobs, skills, skillsByJob, jobsBySkill
  const [contains, setContains] = useState("");
  const {
    data = [],
    isLoading,
    error,
  } = useSearchJobsQuery(contains, { skip: !contains });

  return (
    <div className="App">
      <div>
        <h1>Workforce Data Initiative</h1>
        <p>
          Welcome to the Workforce Data Initiative Skills and Job search! Select
          how you'd like to search the database below, and get cracking!
        </p>
      </div>
      <div className="button-container">
        <button className={`button`} onClick={() => setSearchBy("jobs")}>
          Search Jobs
        </button>
        <button className={`button`} onClick={() => setSearchBy("skills")}>
          Search Skills
        </button>
        <button className={`button`} onClick={() => setSearchBy("skillsByJob")}>
          Search Skills by Job
        </button>
        <button className={`button`} onClick={() => setSearchBy("jobsBySkill")}>
          Search Jobs by Skill
        </button>
      </div>
      {searchBy === "jobs" && <SearchJobs />}
    </div>
  );
}

export default App;
