import React from "react";

const Search = ({ handleSearchFieldsChange, toggleColumnsToSearch, handleSearch }) => {
  return (
    <div className="rsearchContainer">
      <select onChange={handleSearchFieldsChange} className="rdropdown">
        <option key="searchAll">Search All Columns</option>
        {toggleColumnsToSearch()}
      </select>
      <input className="rsearchBox" onChange={(e) => handleSearch(e)} placeholder="SEARCH"></input>
    </div>
  );
};

export default Search;
