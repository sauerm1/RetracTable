import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import Search from './Search/Search';
import normalizeData from './utils/normalizeData';
import searchData from './utils/searchData';
import compareFunction from './utils/compareFunction';
import getNewSortOrder from './utils/getNewSortOrder';

const DataTable = ({
  data,
  capitalize,
  excludeSearch,
  onRowClick,
  retract,
  disableSort,
}) => {
  const [normalizedData, setNormalizedData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [fieldSelected, setFieldSelected] = useState('');
  const [stringSearched, setStringSearched] = useState('');
  const [widthsLoaded, setWidthsLoaded] = useState(false);
  const [columnWidths, setColumnWidths] = useState([]);
  const [sortState, setSortState] = useState({
    field: null,
    order: 'desc',
  });
  const tableRef = useRef(null);

  useEffect(() => {
    setNormalizedData(normalizeData(data, capitalize));
  }, [data]);

  useEffect(() => {
    setDisplayedData(normalizedData);
  }, [normalizedData, columnWidths]);

  useEffect(() => {
    if (tableRef?.current?.children && !widthsLoaded) {
      const cells = tableRef.current.children;
      const widths = Array.prototype.slice
        .call(cells)
        .map((i) => i.offsetWidth);
      setColumnWidths(widths);
      setWidthsLoaded(true);
    }
  }, [displayedData]);

  useEffect(() => {
    setDisplayedData(searchData(normalizedData, stringSearched, fieldSelected));
  }, [stringSearched, fieldSelected]);

  useEffect(() => {
      console.log(sortState)
      console.log(Object.keys(data[0])[0])
    handleSort(sortState, Object.keys(data[0])[0]);
  }, []);

  const handleKeyPress = (e, row) => {
    if (e.charCode == 13) {
      onRowClick(row);
    }
  };

  const renderTableData = (data) => {
    if (normalizedData.length !== 0) {
      const keys = Object.keys(normalizedData[0]);
      const headers = (
        <div className={`rTableRow ${disableSort ? "" : "rPointer"}`}  ref={tableRef}>
          {keys.map((header, index) => {
            let arrow;
            const field = sortState.field.toUpperCase()
            const head = header.toUpperCase()
            if (field === head && sortState.order === 'asc') {
              arrow = <i className="rArrow rArrowDown"></i>;
            } else if (
              field === head &&
              sortState.order === 'desc'
            ) {
              arrow = <i className="rArrow rArrorUp"></i>;
            } else {
              arrow = <i className="rArrow rArrorUp rArrowHide"></i>;
            }
            return (
              <div
                style={retract ? {} : { width: columnWidths[index] }}
                onClick={
                  disableSort ? null : () => handleSort(sortState, header)
                }
                key={`header${index}`}
                className="rTableHead"
              >
                {header}
                {disableSort ? null : arrow}
              </div>
            );
          })}
        </div>
      );

      const tableData = data.map((row, index) => {
        const mappedRow = Object.values(row).map((value, index) => {
          if (typeof value === 'object') {
            return (
              <div key={`data${index}`} className="rTableCell rMoreDataLink">
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
            onKeyPress={onRowClick ? (e) => handleKeyPress(e, row) : null}
            tabIndex={onRowClick ? 0 : null}
            onClick={onRowClick ? () => onRowClick(row) : null}
            key={`row${index}`}
            className={`rTableRow ${onRowClick ? 'rTableRowHover' : ''}`}
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

  const handleSort = (sortState, sortField) => {
    const newSortOrder = getNewSortOrder(sortState, sortField);
    setSortState({
      field: sortField,
      order: newSortOrder,
    });
    setDisplayedData(
      displayedData.sort(compareFunction(sortField, newSortOrder))
    );
  };

  return (
    <div>
      {excludeSearch ? null : (
        <Search
          fieldSelected={fieldSelected}
          handleSearch={handleSearch}
          normalizedData={normalizedData}
          handleSearchFieldsChange={handleSearchFieldsChange}
        />
      )}
      {renderTableData(displayedData)}
    </div>
  );
};

export default DataTable;
