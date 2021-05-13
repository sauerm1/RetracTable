import React from "react";
import DataTable from "./component";
const mockData = require("./mockData/mockData.json");

const App = () => {
    return <DataTable data={mockData} capitalize />;
};

export default App;
