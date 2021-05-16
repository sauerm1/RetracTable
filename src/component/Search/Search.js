import React from "react";

const Search = ({
    fieldSelected,
    handleSearchFieldsChange,
    searchFieldsOptions,
    handleSearch,
}) => {
    return (
        <div className="rsearchContainer">
            <select onChange={handleSearchFieldsChange} className="rdropdown">
                <option value="" key="0">
                    Search All Columns
                </option>
                {searchFieldsOptions()}
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
