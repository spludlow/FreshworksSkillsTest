import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchJobsQuery } from "../features/job-skills-api-slice";
import { setContainsValue, setJobValue } from "../features/job-slice";

import debounce from "lodash.debounce";

import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchJobs() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.job.value);
  const contains = useSelector((state) => state.job.contains);

  const {
    data = [],
    isFetching,
    error,
  } = useSearchJobsQuery(contains, { skip: !contains });

  const debouncedSearch = useCallback(
    debounce((nextValue) => dispatch(setContainsValue(nextValue)), 250),
    []
  );

  const handleInputChange = (event) => {
    dispatch(setJobValue(event.target.value));
    debouncedSearch(event.target.value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Job Title",
        accessor: "suggestion",
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="input">
        <label>Search Jobs by Title</label>
        <input value={value} onChange={handleInputChange} />
      </div>

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

export default SearchJobs;
