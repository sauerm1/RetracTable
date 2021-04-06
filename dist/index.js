import React, { useEffect, useState } from "react";
import "./DataTable.css";
import Search from "./Search/Search";

const DataTable = props => {
  const [displayedData, setDisplayedData] = useState(props.data);
  const [fieldSelected, setFieldSelected] = useState("Search All");
  const [stringSearched, setStringSearched] = useState("");
  const [sort, setSort] = useState({
    field: null,
    order: "desc"
  });

  const renderTableData = () => {
    const data = displayedData;
    const keys = Object.keys(props.data[0]);
    const headers = /*#__PURE__*/React.createElement("div", {
      className: "rTableRow"
    }, keys.map((header, index) => {
      let arrow;

      if (sort.field === header && sort.order === "asc") {
        arrow = /*#__PURE__*/React.createElement("i", {
          className: "rarrow rdown"
        });
      } else if (sort.field === header && sort.order === "desc") {
        arrow = /*#__PURE__*/React.createElement("i", {
          className: "rarrow rup"
        });
      } else {
        arrow = /*#__PURE__*/React.createElement("i", {
          className: "rarrow rup rhide"
        });
      }

      return /*#__PURE__*/React.createElement("div", {
        onClick: () => handleSort(header),
        key: `header${index}`,
        className: "rTableHead"
      }, header, arrow);
    }));
    const tableData = data.map((row, index) => {
      const mappedRow = Object.values(row).map((value, index) => {
        return /*#__PURE__*/React.createElement("div", {
          key: `data${index}`,
          className: "rTableCell"
        }, value.toString());
      });
      return /*#__PURE__*/React.createElement("div", {
        key: `row${index}`,
        className: "rTableRow"
      }, mappedRow);
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "rTable"
    }, headers, tableData);
  };

  const compareObjects = (o1, o2) => {
    var k = "";

    for (k in o1) if (o1[k] !== o2[k]) return false;

    for (k in o2) if (o1[k] !== o2[k]) return false;

    return true;
  };

  const itemExists = (haystack, needle) => {
    for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;

    return false;
  };

  const handleSearch = toSearch => {
    setStringSearched(toSearch.target.value);
  };

  useEffect(() => {
    searchData(stringSearched);
  }, [stringSearched]);

  const searchData = stringSearched => {
    let results = [];
    const data = props.data;
    const searchString = stringSearched.toUpperCase();

    for (var i = 0; i < data.length; i++) {
      if (fieldSelected === "Search All") {
        for (let key in data[i]) {
          if (data[i][key].toString().toUpperCase().indexOf(searchString) !== -1) {
            if (!itemExists(results, data[i])) results.push(data[i]);
          }
        }
      } else {
        if (data[i][fieldSelected].toString().toUpperCase().indexOf(searchString) !== -1) {
          if (!itemExists(results, data[i])) results.push(data[i]);
        }
      }
    }

    setDisplayedData(results);
  };

  const handleSearchFieldsChange = event => {
    setFieldSelected(event.target.value);
  };

  useEffect(() => {
    searchData(stringSearched);
  }, [fieldSelected]);

  const toggleColumnsToSearch = () => {
    const keys = Object.keys(props.data[0]);
    const searchFields = keys.map((i, index) => {
      return /*#__PURE__*/React.createElement("option", {
        key: `search${index}`
      }, i);
    });
    return searchFields;
  };

  const compareValues = (key, order = "asc") => {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;

      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === "desc" ? comparison * -1 : comparison;
    };
  };

  const handleSort = newField => {
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
      order: newOrder
    });
    setDisplayedData(displayedData.sort(compareValues(newField, newOrder)));
  };

  useEffect(() => {
    handleSort(Object.keys(props.data[0])[0]);
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Search, {
    handleSearch: handleSearch,
    toggleColumnsToSearch: toggleColumnsToSearch,
    handleSearchFieldsChange: handleSearchFieldsChange
  }), renderTableData());
};

export default DataTable;