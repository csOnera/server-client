import {MongoClient} from 'mongodb';


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


export async function executeCrudOperation(action, ref, serial, num = 1) {
    const uri = process.env.DB_URI;
    let mongoClient;
    let doc;

    if (num == 1) {
        serial = [serial]
    };

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('CS_Data');
        const collection = db.collection('ref_serial');

        // console.log("CREATE ref_serial");
        // await createRefDocument(collection);

        let check;
        // here a switch for different actions by request
        switch (action) {
            
            case "add":
                // check if have original first
                check = await checkExistenceOfRef(collection, ref) 
                if (check.length == 0) {
                    await createRefDocument(collection, ref, serial)
                } else {
                    await updateSerialByRef(collection, ref, serial)
                };
                break;
            case "drop":
                check = await deleteSerialsWRef(collection, ref, serial)
                break;
            case "checkSerialByRef":
                var receivedSerials = await checkExistenceOfRef(collection, ref);
                break;
            case "checkRefBySerial":
                var refList = []
                
                for (let i = 0; i < serial.length; i++) {
                    console.log("searching serialno: " + serial[i], typeof(serial[i]))
                    let receivedRef = await findRefBySerial(collection, serial[i]);
                    console.log(receivedRef[0]);
                    try {
                        if (receivedRef.length != 0) {
                            refList.push(receivedRef[0]['ref']);
                        } else {
                            console.log(serial[i] + ": ref not found")
                            refList.push("")
                        }
                    } finally {
                        
                    }
                }
                break;
        };

        
    } finally {
        await mongoClient.close();

        switch (action) {
            case "add":
                return ["data appended"];
            case "drop":
                // console.log(check);
                return ["data deleted"];
            case "checkSerialByRef":
                return receivedSerials[0]['serial'];
            case "checkRefBySerial":
                console.log("refList: " + refList);
                return refList;
        };
    }
}

export async function createRefDocument(collection, ref, serial) {
       
    const refDocument = {
        ref: ref,
        serial: serial,
    };

    await collection.insertOne(refDocument);
}

export async function checkExistenceOfRef(collection, ref) {
    return collection.find({ref: ref}).toArray();
}

export async function findRefBySerial(collection, serial) {
    return collection.find(
    {serial: serial}
    ).toArray();
    return answer
}

export async function updateSerialByRef(collection, ref, serialA) {
    await collection.updateMany(
        { ref },
        { $push: { serial: { $each: serialA}}}
    );
}

export async function deleteSerialsWRef(collection, ref, serialA) {
    await collection.updateMany(
        { },
        { $pull: {serial: { $in: serialA}}}
    );
}
