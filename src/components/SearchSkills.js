import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchSkillsQuery } from "../features/job-skills-api-slice";
import { setContainsValue, setSkillValue } from "../features/skills-slice";

import debounce from "lodash.debounce";

import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchSkills() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.skill.value);
  const contains = useSelector((state) => state.skill.contains);

  const {
    data = [],
    isFetching,
    error,
  } = useSearchSkillsQuery(contains, { skip: !contains });

  const debouncedSearch = useCallback(
    debounce((nextValue) => dispatch(setContainsValue(nextValue)), 250),
    []
  );

  const handleInputChange = (event) => {
    dispatch(setSkillValue(event.target.value));
    debouncedSearch(event.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Skill Name",
        accessor: "suggestion",
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="input">
        <label>Search Skills by Name</label>
        <input value={value} onChange={handleInputChange} />
      </div>{" "}
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <ErrorResult error={error} />
          ) : (
            <>
              {data && data.length ? (
                <ResultsTable columns={columns} data={data} />
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

export default SearchSkills;
