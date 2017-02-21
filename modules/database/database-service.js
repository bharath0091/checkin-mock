let db = require('mongodb');
let ObjectID = db.ObjectID;
let MongoClient = db.MongoClient;

let database;

(function (){
    MongoClient.connect( "mongodb://localhost:27017/newapp", function( err, db ) {
        if(err) process.exit(1);
        database = db;
    } );
})();

function getCollection (collectionName) {
    return database.collection(collectionName);
}

function getDocumentByFieldName(collectionName, queryFieldName, queryFieldValue, callback) {
    let query = {};
    query[queryFieldName] = queryFieldValue;
    let stream = getCollection(collectionName).find(query).stream();
    collectStreamData(stream, callback);
}

function collectStreamData(stream, callback){
    var documentsArray = [];
    stream.on('data', data => documentsArray.push(data));
    stream.on('end', data => callback(null, documentsArray));
    stream.on('error', error => callback(error, null));
}

module.exports = {
    getDocumentByFieldName :  getDocumentByFieldName,
    insertOneDocument : (collectionName, document, callback) => getCollection(collectionName).insertOne(document, callback)
};