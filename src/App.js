import React from 'react';
import DataTable from './component';
const mockData = require('./mockData/data.json');

const testCallback = (data) => {
  console.log(data);
};

const App = () => {
  return <DataTable data={mockData} capitalize onRowClick={testCallback}/>;
};

export default App;
