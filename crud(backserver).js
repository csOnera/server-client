import { MongoClient } from 'mongodb';


export async function connectToCluster(uri) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}


export async function executeCrudOperation() {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('CS_Data');
        const collection = db.collection('ref_serial')

        // console.log("CREATE ref_serial");
        // await createRefDocument(collection);
        let doc = await findRefBySerial(collection, "1UAX7S0UN");
        console.log(doc[0].ref)

        // console.log('UPDATE Serial')
        // await updateSerialByRef(collection, 'H82365141', ["hellonewnew"])
        // console.log(await findRefBySerial(collection, "1UAX7S0UN"))
        // console.log('DELETE Ref')
        // await deleteDocumentByRef(collection, 'H82365141');
    } finally {
        await mongoClient.close();
    }
}

export async function createRefDocument(collection) {
    const refDocument = {
        ref: "H82365141",
        serial: ["1UAX7S0UN", "4XXS8XX2P", "NAZF3JBXS"],
    };

    await collection.insertOne(refDocument);
}
export async function findRefBySerial(collection, serial) {
    return collection.find({
        serial: serial
    }).toArray();
}

export async function updateSerialByRef(collection, ref, updatedFields) {
    await collection.updateMany(
        { ref },
        [{ $set: { serial: { $concatArrays: ["$serial", updatedFields]}}}]
    );
}

export async function deleteDocumentByRef(collection, ref) {
    await collection.deleteMany({ref});
}