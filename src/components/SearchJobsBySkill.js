import React, { useState } from "react";
import {
  useGetJobsForSkillQuery,
  useSearchSkillsQuery,
} from "../features/jobSkills/job-skills-api-slice";
import "../App.css";
import Autocomplete from "./Autocomplete";

function SearchJobsBySkill() {
  const [skill, setSkill] = useState(null);

  const {
    data = { skills: [] },
    isFetching,
    error,
  } = useGetJobsForSkillQuery(skill?.uuid, { skip: !skill });

  return (
    <div className="container">
      <Autocomplete
        label="Select skill from autocomplete"
        setSelected={setSkill}
        query={useSearchSkillsQuery}
      />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>
              <h3>Error!</h3>
              <p>
                {error.data.error.message} ({skill.suggestion})
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Job Name</th>
                  <th>Importance</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {data.jobs
                  ? data.jobs.map((job) => (
                      <tr key={skill.skill_uuid}>
                        <td>{job.job_title}</td>
                        <td>{job.importance}</td>
                        <td>{job.level}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default SearchJobsBySkill;
