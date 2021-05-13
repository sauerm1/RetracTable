import React from "react";
import DataTable from "./component";
const mockData = require("./mockData.json");

const App = () => {
    return <DataTable data={mockData} />;
};

export default App;
