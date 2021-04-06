import React, { Component } from "react";
import "./Search.css";

const Search = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "rsearchContainer"
  }, /*#__PURE__*/React.createElement("select", {
    onChange: props.handleSearchFieldsChange,
    className: "rdropdown"
  }, /*#__PURE__*/React.createElement("option", {
    key: "searchAll"
  }, "Search All"), props.toggleColumnsToSearch()), /*#__PURE__*/React.createElement("input", {
    className: "rsearchBox",
    onChange: e => props.handleSearch(e),
    placeholder: "SEARCH"
  }));
};

export default Search;