import React from "react";

import "./Search.css";

const Search = (props) => {
    return (
      <div className="rsearchContainer">
        <select onChange={props.handleSearchFieldsChange} className="rdropdown">
        <option key="searchAll">Search All</option>
          {props.toggleColumnsToSearch()}
        </select>
        <input
          className="rsearchBox"
          onChange={(e) => props.handleSearch(e)}
          placeholder="SEARCH"
        ></input>
      </div>
    );
}

export default Search;
