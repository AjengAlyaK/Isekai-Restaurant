const { collection } = require('..config/config');

// insertOne
const result = await collection.insertOne({
    username: 'Ajeng',
    password: 'starlightsuper'
})