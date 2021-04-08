# RetracTable

This project is a lightwight, zero dependency, react.js table. All that you have to do create a Table element and pass an array of objects to it as the `data` prop.

Robust features like sorting and searching are build in. Just give it a try.


### Useage
```js
import React from 'react';
import Table from 'retractable';
const myData = require('./myData.json')

const App = () => {
    return (
        <Table data={myData}/>
    )
}

export default App;
```

this will produce a table like so...

![image info](./public/example.png)


The table will normalize your data if there are any attributes missing from some objects. 

Nested data is not supported... yet!