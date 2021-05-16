import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./Search/Search";
import normalizeData from "./utils/normalizeData";
import searchData from "./utils/searchData";

const DataTable = ({ data, capitalize, excludeSearch, rowOnClick }) => {
    const [normalizedData, setNormalizedData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [fieldSelected, setFieldSelected] = useState("");
    const [stringSearched, setStringSearched] = useState("");
    const [sortState, setSortState] = useState({
        field: null,
        order: "desc",
    });

    useEffect(() => {
        setNormalizedData(normalizeData(data, capitalize));
    }, [data]);

    useEffect(() => {
        setDisplayedData(normalizedData);
    }, [normalizedData]);

    useEffect(() => {
        setDisplayedData(
            searchData(normalizedData, stringSearched, fieldSelected)
        );
    }, [stringSearched, fieldSelected]);

    useEffect(() => {
        handleSort(sortState, Object.keys(data[0])[0]);
    }, []);

    const renderTableData = (data) => {
        if (normalizedData.length !== 0) {
            const keys = Object.keys(normalizedData[0]);
            const headers = (
                <div className="rTableRow">
                    {keys.map((header, index) => {
                        let arrow;
                        if (
                            sortState.field === header &&
                            sortState.order === "asc"
                        ) {
                            arrow = <i className="rArrow rArrowDown"></i>;
                        } else if (
                            sortState.field === header &&
                            sortState.order === "desc"
                        ) {
                            arrow = <i className="rArrow rArrorUp"></i>;
                        } else {
                            arrow = (
                                <i className="rArrow rArrorUp rArrowHide"></i>
                            );
                        }
                        return (
                            <div
                                onClick={() => handleSort(sortState, header)}
                                key={`header${index}`}
                                className="rTableHead"
                            >
                                {header}
                                {arrow}
                            </div>
                        );
                    })}
                </div>
            );

            const tableData = data.map((row, index) => {
                const mappedRow = Object.values(row).map((value, index) => {
                    if (typeof value === "object") {
                        return (
                            <div
                                key={`data${index}`}
                                className="rTableCell rMoreDataLink"
                            >
                                more
                                <div className="rMoreData">
                                    {JSON.stringify(value, null, 2)}
                                </div>
                            </div>
                        );
                    } else
                        return (
                            <div key={`data${index}`} className="rTableCell">
                                {String(value)}
                            </div>
                        );
                });
                return (
                    <div
                        onClick={rowOnClick ? () => rowOnClick(row) : null}
                        key={`row${index}`}
                        className={`rTableRow ${
                            rowOnClick ? "rTableRowHover" : ""
                        }`}
                    >
                        {mappedRow}
                    </div>
                );
            });
            return (
                <div className="rTable">
                    {headers}
                    {tableData}
                </div>
            );
        }
    };

    const handleSearch = (toSearch) => {
        setStringSearched(toSearch.target.value);
    };

    const handleSearchFieldsChange = (event) => {
        setFieldSelected(event.target.value);
    };

    const searchFieldsOptions = () => {
        if (normalizedData.length !== 0) {
            const keys = Object.keys(normalizedData[0]);
            const searchFields = keys.map((i, index) => {
                return <option key={`search${index + 1}`}>{i}</option>;
            });
            return searchFields;
        }
    };

    const compareValues = (key, order) => {
        return (a, b) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0;
            }

            const varA =
                typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
            const varB =
                typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return order === "desc" ? comparison * -1 : comparison;
        };
    };

    const getNewSortOrder = (sortState, sortField) => {
        let newSortOrder;
        if (sortState.field === sortField) {
            sortState?.order === "asc"
                ? (newSortOrder = "desc")
                : (newSortOrder = "asc");
        } else if (sortState.field === null || sortState.field !== sortField) {
            newSortOrder = "asc";
        }
        return newSortOrder
    };

    const handleSort = (sortState, sortField) => {
        const newSortOrder = getNewSortOrder(sortState, sortField)
        setSortState({
            field: sortField,
            order: newSortOrder,
        });
        setDisplayedData(
            displayedData.sort(compareValues(sortField, newSortOrder))
        );
    };

    return (
        <div>
            {excludeSearch ? null : (
                <Search
                    fieldSelected={fieldSelected}
                    handleSearch={handleSearch}
                    searchFieldsOptions={searchFieldsOptions}
                    handleSearchFieldsChange={handleSearchFieldsChange}
                />
            )}

            {renderTableData(displayedData)}
        </div>
    );
};

export default DataTable;
