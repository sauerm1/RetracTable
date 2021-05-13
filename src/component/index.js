import React, { useEffect, useState } from "react";
import "./index.css";
import Search from "./Search/Search";

const DataTable = ({ data, capitalize }) => {
    const [normalizedData, setNormalizedData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [fieldSelected, setFieldSelected] = useState("Search All");
    const [stringSearched, setStringSearched] = useState("");
    const [sort, setSort] = useState({
        field: null,
        order: "desc",
    });

    useEffect(() => {
        normalizeData(data);
    }, [data]);

    useEffect(() => {
        setDisplayedData(normalizedData);
    }, [normalizedData]);

    const normalizeData = (data) => {
        let keys = [];
        for (const i in data) {
            Object.keys(data[i]).forEach((i) => {
                if (!keys.includes(i)) {
                    keys.push(i);
                }
            });
        }
        const normalizedData = data.map((r) => {
            let row = {};
            keys.forEach((k) => {
                let cell;
                if (r[k] !== undefined && r[k] !== null) {
                    cell = r[k];
                } else {
                    cell = "";
                }
                row[k] = cell;
            });
            return row;
        });
        setNormalizedData(normalizedData);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderTableData = (data) => {
        if (normalizedData.length !== 0) {
            const keys = Object.keys(normalizedData[0]);

            const headers = (
                <div className="rTableRow">
                    {keys.map((header, index) => {
                        let arrow;
                        if (sort.field === header && sort.order === "asc") {
                            arrow = <i className="rArrow rArrowDown"></i>;
                        } else if (
                            sort.field === header &&
                            sort.order === "desc"
                        ) {
                            arrow = <i className="rArrow rArrorUp"></i>;
                        } else {
                            arrow = (
                                <i className="rArrow rArrorUp rArrowHide"></i>
                            );
                        }
                        return (
                            <div
                                onClick={() => handleSort(header)}
                                key={`header${index}`}
                                className="rTableHead"
                            >
                                {capitalize
                                    ? capitalizeFirstLetter(header)
                                    : header}
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
                    <div key={`row${index}`} className="rTableRow">
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

    const compareObjects = (o1, o2) => {
        var k = "";
        for (k in o1) if (o1[k] !== o2[k]) return false;
        for (k in o2) if (o1[k] !== o2[k]) return false;
        return true;
    };

    const itemExists = (haystack, needle) => {
        for (var i = 0; i < haystack.length; i++)
            if (compareObjects(haystack[i], needle)) return true;
        return false;
    };

    const handleSearch = (toSearch) => {
        setStringSearched(toSearch.target.value);
    };

    useEffect(() => {
        searchData(stringSearched);
    }, [stringSearched]);

    const searchData = (stringSearched) => {
        let results = [];
        const searchString = stringSearched.toUpperCase();
        for (var i = 0; i < normalizedData.length; i++) {
            if (fieldSelected === "Search All") {
                for (let key in normalizedData[i]) {
                    if (
                        normalizedData[i][key]
                            .toString()
                            .toUpperCase()
                            .indexOf(searchString) !== -1
                    ) {
                        if (!itemExists(results, normalizedData[i]))
                            results.push(normalizedData[i]);
                    }
                }
            } else {
                if (
                    normalizedData[i][fieldSelected]
                        .toString()
                        .toUpperCase()
                        .indexOf(searchString) !== -1
                ) {
                    if (!itemExists(results, normalizedData[i]))
                        results.push(normalizedData[i]);
                }
            }
        }
        setDisplayedData(results);
    };

    const handleSearchFieldsChange = (event) => {
        setFieldSelected(event.target.value);
    };

    useEffect(() => {
        searchData(stringSearched);
    }, [fieldSelected]);

    const toggleColumnsToSearch = () => {
        if (normalizedData.length !== 0) {
            const keys = Object.keys(normalizedData[0]);
            const searchFields = keys.map((i, index) => {
                return <option key={`search${index}`}>{i}</option>;
            });
            return searchFields;
        }
    };

    const compareValues = (key, order = "asc") => {
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

    const handleSort = (newField) => {
        let newOrder;
        if (sort.field === newField) {
            switch (sort.order) {
                case "asc":
                    newOrder = "desc";
                    break;
                case "desc":
                    newOrder = "asc";
                    break;
                default:
                    newOrder = "asc";
            }
        } else if (sort.field === null || sort.field !== newField) {
            newOrder = "asc";
        }
        setSort({
            field: newField,
            order: newOrder,
        });
        setDisplayedData(displayedData.sort(compareValues(newField, newOrder)));
    };

    useEffect(() => {
        handleSort(Object.keys(data[0])[0]);
    }, []);

    return (
        <div>
            <Search
                handleSearch={handleSearch}
                toggleColumnsToSearch={toggleColumnsToSearch}
                handleSearchFieldsChange={handleSearchFieldsChange}
            />
            {renderTableData(displayedData)}
        </div>
    );
};

export default DataTable;
