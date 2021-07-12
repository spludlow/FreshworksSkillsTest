import React, { useCallback, useState } from "react";
import { useSearchSkillsQuery } from "../features/jobSkills/job-skills-api-slice";
import "../App.css";
import debounce from "lodash.debounce";
import { ErrorResult, NoResults } from "./CommonComponents";

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
                <table>
                  <thead>
                    <tr>
                      <th>Skill Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((skill) => (
                      <tr key={skill.uuid}>
                        <td>{skill.suggestion}</td>
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

export default SearchSkills;
