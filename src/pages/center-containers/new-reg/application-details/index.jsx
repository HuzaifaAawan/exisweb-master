import React, { useState } from "react";
import "./styles.scss";
import { APP_DETAILS_DATA } from "./search-result/data";
import SearchResult from "./search-result";

const ApplicationDetails = () => {
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState(null);

  const handleSearch = () => {
    setData(APP_DETAILS_DATA);
    setShowResults(true);
  };
  return (
    <div className="app-details-container">
      <div className="app-details-card">
        <div className="header-cls">
          <h3>Application Details</h3>
          <p>
            Enter your Computer ID and Chassis Number to view your submitted
            application details.
          </p>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label-cls">Application Computer ID</label>
            <input type="text" placeholder="Enter here..." />
          </div>

          <div className="form-group">
            <label className="label-cls">Chasis Number</label>
            <input type="text" placeholder="Enter here..." />
          </div>

          <div className="form-group button-group">
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {showResults && <SearchResult data={data} />}
    </div>
  );
};

export default ApplicationDetails;
