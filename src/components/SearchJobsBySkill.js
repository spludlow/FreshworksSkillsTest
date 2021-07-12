import React, { useState } from "react";
import {
  useGetJobsForSkillQuery,
  useSearchSkillsQuery,
} from "../features/jobSkills/job-skills-api-slice";

import Autocomplete from "./Autocomplete";
import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchJobsBySkill() {
  const [skill, setSkill] = useState(null);

  const {
    data = { skills: [] },
    isFetching,
    error,
  } = useGetJobsForSkillQuery(skill?.uuid, { skip: !skill });

  const columns = React.useMemo(
    () => [
      {
        Header: "Job Title",
        accessor: "job_title",
      },
      {
        Header: "Importance",
        accessor: "importance",
      },
      {
        Header: "Level",
        accessor: "level",
      },
    ],
    []
  );

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
            <ErrorResult error={error} />
          ) : (
            <>
              {data.jobs && data.jobs.length ? (
                <ResultsTable columns={columns} data={data.jobs} />
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

export default SearchJobsBySkill;
