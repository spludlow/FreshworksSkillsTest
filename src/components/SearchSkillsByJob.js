import React, { useState } from "react";
import {
  useGetSkillsForJobQuery,
  useSearchJobsQuery,
} from "../features/jobSkills/job-skills-api-slice";

import Autocomplete from "./Autocomplete";
import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchSkillsByJob() {
  const [job, setJob] = useState(null);

  const {
    data = { skills: [] },
    isFetching,
    error,
  } = useGetSkillsForJobQuery(job?.uuid, { skip: !job });

  const columns = React.useMemo(
    () => [
      {
        Header: "Skill Name",
        accessor: "skill_name",
      },
      {
        Header: "Description",
        accessor: "description",
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
                <ResultsTable columns={columns} data={data.skills} />
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
