const express = require('express');
const app = express();
const port = 3000;

const database = require('./src/config/config');

app.get('/', (req, res)  =>{
    res.send('hellwrld');
});

// app.post('/login', login);

app.listen(port, () =>{
    console.log(`listening to port ${port}...`);
});

