import React from "react";
import DataTable from "./component";
const mockData = require("./mockData/mockData.json");
// const mockData = require("./mockData/mockDataWithObject.json");

const testCallback = (data) => {
    console.log(data);
};

const App = () => {
    return (
        <DataTable 
            data={mockData} 
            capitalize 
            rowOnClick={testCallback} 
        />
    );
};

export default App;
