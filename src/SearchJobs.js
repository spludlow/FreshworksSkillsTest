import React, { useCallback, useState } from "react";
import { useSearchJobsQuery } from "./features/jobSkills/job-skills-api-slice";
import "./App.css";
import debounce from "lodash.debounce";

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
    <div className="">
      <input value={value} onChange={handleInputChange} />
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>
              <h3>Error!</h3>
              <p>{error.data.error.message}</p>
            </div>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}

export default SearchJobs;
