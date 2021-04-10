# RetracTable

This project is a scalable, lightwight, zero dependency, react.js table. All that you have to do create a Table element and pass an array of objects to it as the `data` prop.

Robust features like sorting and searching are build in. Just give it a try.

<br>

### Get Started
```sh
npm i retractable
```

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

### This will produce a table like so...

![Eample](./public/example.png)

<br>

### Nested data is now supported!

![Eample](./public/objectExample.png)

