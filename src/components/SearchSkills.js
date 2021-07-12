import React, { useCallback, useState } from "react";
import { useSearchSkillsQuery } from "../features/jobSkills/job-skills-api-slice";
import "../App.css";
import debounce from "lodash.debounce";

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
          )}
        </>
      )}
    </div>
  );
}

export default SearchSkills;
