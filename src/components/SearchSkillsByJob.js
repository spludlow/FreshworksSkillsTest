import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSkillsForJobQuery,
  useSearchJobsQuery,
} from "../features/job-skills-api-slice";
import { setSelectedJob } from "../features/selected-job-slice";

import Autocomplete from "./Autocomplete";
import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchSkillsByJob() {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.selectedJob.job);

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
        selected={job}
        setSelected={(v) => dispatch(setSelectedJob(v))}
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
