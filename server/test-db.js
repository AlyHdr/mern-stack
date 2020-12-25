var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.17.0.2:27017/";

const collectionName = "todos"
const dbName = "mydb"
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db(dbName);
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection(collectionName).insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});