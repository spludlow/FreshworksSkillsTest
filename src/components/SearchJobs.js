import React, { useCallback, useState } from "react";
import { useSearchJobsQuery } from "../features/jobSkills/job-skills-api-slice";
import "../App.css";
import debounce from "lodash.debounce";
import { ErrorResult, NoResults } from "./CommonComponents";

function SearchJobs() {
  const [value, setValue] = useState("");
  const [contains, setContains] = useState("");
  const {
    data = [],
    isFetching,
    error,
  } = useSearchJobsQuery(contains, { skip: !contains });

  const debouncedSearch = useCallback(
    debounce((nextValue) => setContains(nextValue), 250),
    []
  );

  const handleInputChange = (event) => {
    setValue(event.target.value);
    debouncedSearch(event.target.value);
  };

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
                <table>
                  <thead>
                    <tr>
                      <th>Job Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((job) => (
                      <tr key={job.uuid}>
                        <td>{job.suggestion}</td>
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

export default SearchJobs;
