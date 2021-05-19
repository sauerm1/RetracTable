import React from 'react';

const Search = ({
  fieldSelected,
  handleSearchFieldsChange,
  normalizedData,
  handleSearch,
}) => {
  const searchFieldsOptions = (data) => {
    if (data.length !== 0) {
      const keys = Object.keys(data[0]);
      const searchFields = keys.map((i, index) => {
        return <option key={`search${index + 1}`}>{i}</option>;
      });
      return searchFields;
    }
  };

  return (
    <div className="rsearchContainer">
      <select onChange={handleSearchFieldsChange} className="rdropdown">
        <option value="" key="0">
          Search All Columns
        </option>
        {searchFieldsOptions(normalizedData)}
      </select>
      <input
        className="rsearchBox"
        onChange={(e) => handleSearch(e)}
        placeholder={`Search ${fieldSelected}`}
      ></input>
    </div>
  );
};

export default Search;
