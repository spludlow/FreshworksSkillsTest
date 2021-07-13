import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetJobsForSkillQuery,
  useSearchSkillsQuery,
} from "../features/job-skills-api-slice";
import { setSelectedSkill } from "../features/selected-skill-slice";

import Autocomplete from "./Autocomplete";
import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchJobsBySkill() {
  const dispatch = useDispatch();
  const skill = useSelector((state) => state.selectedSkill.skill);

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
        selected={skill}
        setSelected={(v) => dispatch(setSelectedSkill(v))}
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
