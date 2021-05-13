import React from "react";

const Search = ({
    fieldSelected,
    handleSearchFieldsChange,
    toggleColumnsToSearch,
    handleSearch,
}) => {
    return (
        <div className="rsearchContainer">
            <select onChange={handleSearchFieldsChange} className="rdropdown">
                <option value="" key="0">
                    Search All Columns
                </option>
                {toggleColumnsToSearch()}
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
