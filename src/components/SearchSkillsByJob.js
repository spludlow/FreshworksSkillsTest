import React, { useState } from "react";
import {
  useGetSkillsForJobQuery,
  useSearchJobsQuery,
} from "../features/jobSkills/job-skills-api-slice";
import "../App.css";
import Autocomplete from "./Autocomplete";
import { ErrorResult, NoResults } from "./CommonComponents";

function SearchSkillsByJob() {
  const [job, setJob] = useState(null);

  const {
    data = { skills: [] },
    isFetching,
    error,
  } = useGetSkillsForJobQuery(job?.uuid, { skip: !job });

  return (
    <div className="container">
      <Autocomplete
        label="Select job from autocomplete"
        setSelected={setJob}
        query={useSearchJobsQuery}
      />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <ErrorResult error={error} />
          ) : (
            <>
              {data.skills && data.skills.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Skill Name</th>
                      <th>Skill Description</th>
                      <th>Importance</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.skills.map((skill) => (
                      <tr key={skill.skill_uuid}>
                        <td>{skill.skill_name}</td>
                        <td>{skill.description}</td>
                        <td>{skill.importance}</td>
                        <td>{skill.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <NoResults />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SearchSkillsByJob;
