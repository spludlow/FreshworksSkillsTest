import React, { useCallback, useState } from "react";
import { useSearchSkillsQuery } from "../features/jobSkills/job-skills-api-slice";

import debounce from "lodash.debounce";

import ResultsTable from "./Table";
import { ErrorResult, NoResults } from "./CommonComponents";
import "../App.css";

function SearchSkills() {
  const [value, setValue] = useState("");
  const [contains, setContains] = useState("");
  const {
    data = [],
    isFetching,
    error,
  } = useSearchSkillsQuery(contains, { skip: !contains });

  const debouncedSearch = useCallback(
    debounce((nextValue) => setContains(nextValue), 250),
    []
  );

  const handleInputChange = (event) => {
    setValue(event.target.value);
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
