import React from "react";
import "../App.css";

export function NoResults() {
  return (
    <div className="no-results">
      <h3>No Results</h3>
      <p>Try using the input above to search the database!</p>
    </div>
  );
}

export function ErrorResult({ error }) {
  return (
    <div className="error-results">
      <h3>Error!</h3>
      <p>{error.data.error.message}</p>
    </div>
  );
}
