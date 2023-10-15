const express = require('express');
const app = express();
const port = 3000;

const database = require('./src/config/config');

app.get('/', (req, res)  =>{
    res.send('hellwrld');
});

app.listen(port, () =>{
    console.log(`listening to port ${port}...`);
});

