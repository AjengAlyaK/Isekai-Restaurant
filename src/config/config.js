const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'ecommerce';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('account');

    // insertOne
    // const result = await collection.insertOne({
    //     username: 'Ajeng',
    //     password: 'starlightsuper'
    // });

    // insertMany
    // const result = await collection.insertMany(
    //     [
    //         {
    //             username: 'Levi Ackerman',
    //             password: 'levi'
    //         },
    //         {
    //             username: 'Loid Forger',
    //             password: 'loid'
    //         }
    //     ]
    // )

    // .find() error eheheh
    // const result = await collection.find({ _id: ObjectId('652bf7bf901fac249f3f3616') }).toArray();


    console.log(result);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());