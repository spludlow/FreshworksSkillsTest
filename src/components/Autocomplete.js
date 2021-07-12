import React, { useCallback, useState } from "react";
import "../App.css";
import debounce from "lodash.debounce";

function Autocomplete({ label, setSelected, query }) {
  const [value, setValue] = useState("");
  const [contains, setContains] = useState("");
  const [focused, setFocused] = useState(false);

  const { data = [], isFetching, error } = query(contains, { skip: !contains });

  const debouncedSearch = useCallback(
    debounce((nextValue) => setContains(nextValue), 250),
    []
  );

  const handleInputChange = (event) => {
    setValue(event.target.value);
    debouncedSearch(event.target.value);
    setFocused(true);
  };

  const handleClickSuggestion = (item) => {
    setSelected(item);
    setValue(item.title || item.suggestion);
    setFocused(false);
  };

  return (
    <div className="autocomplete">
      <div className="input">
        <label>{label}</label>
        <input
          className="autocomplete-input"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      {focused && (
        <div className="autocomplete-suggestions">
          <>
            {isFetching ? (
              <div>Loading...</div>
            ) : (
              <>
                {error ? (
                  <div>Error: {error.data.error.message}</div>
                ) : (
                  <>
                    {data.map((item) => (
                      <div
                        key={item.uuid}
                        className="suggestion"
                        onClick={() => handleClickSuggestion(item)}
                      >
                        {item.suggestion}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
