import React, { useCallback, useEffect, useRef, useState } from "react";
import "../App.css";
import debounce from "lodash.debounce";

function Autocomplete({ label, selected, setSelected, query }) {
  const wrapperRef = useRef(null);
  const [value, setValue] = useState(
    selected ? selected?.title || selected?.suggestion : ""
  );
  const [contains, setContains] = useState("");
  const [focused, setFocused] = useState(false);

  const { data = [], isFetching, error } = query(contains, { skip: !contains });

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFocused(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

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
    <div className="autocomplete" ref={wrapperRef}>
      <div className="input">
        <label>{label}</label>
        <input
          className="autocomplete-input"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
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
