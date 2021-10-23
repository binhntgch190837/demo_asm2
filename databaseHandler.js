const {MongoClient,ObjectId} = require('mongodb')

const DATABASE_URL = 'mongodb+srv://thanhbinh2001:123456789abc@cluster0.spshl.mongodb.net'
const DATABASE_NAME = 'Bin_Shop'

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

//vi du obj la thong tin van insert, collection: ten cua bang can insert-vd Products
async function insertToDB(obj,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Gia tri id moi duoc insert la: ", result.insertedId.toHexString());
}

async function findProductsByCategory(category){
    const dbo = await getDatabase()
    const result = await dbo.collection("Products").find({
        "cat": category
    }).toArray()
    return result
}

async function findProductsByProductName(name){
    const dbo = await getDatabase()
    const result = await dbo.collection("Products").find({
        "name": { $regex: new RegExp(name, 'i') }
    }).toArray()
    return result
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

module.exports = {insertToDB,getAll,deleteObject,getDocumentById,updateDocument, findProductsByCategory, findProductsByProductName}

