const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'ecommerce';

const db = client.db(dbName);
const collection = db.collection('account');

const main = async function () {
    await client.connect();
    console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('account');

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

    // .find() error eheheh -> solved
    
    // const searchId = new ObjectId('652bf7bf901fac249f3f3616');
    // const result = await collection.find({ _id: searchId }).toArray();

    // .updateOne() berdasarkan id
    // const result = await collection.updateOne(
    //     {
    //         _id: searchId
    //     },
    //     {
    //         $set :{
    //             username: 'Ajeng Alya'
    //         },
    //     }
    // );

    // updateMany() berdasarkan nama
    // const result = await collection.updateMany(
    //     {
    //         username: 'Loid Forger'
    //     },
    //     {
    //         $set :{
    //             username: 'Twilight'
    //         }
    //     }
    // )

    // deleteOne() 
    // const result = await collection.deleteOne(
    //     {
    //         _id: searchId
    //     }
    // )

    // deleteMany() 
    // const result = await collection.deleteMany(
    //     {
    //         username: 'Twilight'
    //     }
    // )

    console.log(result);
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

module.exports = { collection };