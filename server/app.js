const express = require('express')
const mongo = require('mongodb');
const app = express();
const port = 8000;
const cors = require('cors')

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://'+process.env.MONGO_IP+':27017/';
const collectionName = "todos"
const dbName = "mydb"
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/todos',(req,res)=>{
    MongoClient.connect(url).then((db)=> {
    
        var dbo = db.db(dbName);
        dbo.collection(collectionName).find({}).toArray((err, result) => {
          if (err){
            console.log(err)
            res.sendStatus(500).send("server error")
          }else{
            //console.log(result);
            res.json(result)
          }
          db.close();
        });
      });
})
app.post('/add',(req,res)=> {
    MongoClient.connect(url, (err, db) => {
        if(err){
          console.log(err)
        }else{
          var dbo = db.db(dbName)
          dbo.collection(collectionName).insertOne({
              content: req.body.content,
          },(err,doc)=>{
            if(err){
              console.log(err)
              res.send(err)
            }else{
              console.log('document added...')
              res.send(doc)
            }
            db.close()
          });
        }
    }); 
})
app.post('/delete',(req,res)=> {
    MongoClient.connect(url, (err, db) => {
        if(err){
          console.log(err)
        }else{
          var dbo = db.db(dbName)
          var idObj = new mongo.ObjectId(req.body.id)
          dbo.collection(collectionName).deleteOne({
              _id: idObj,
          },(err,doc)=>{
            if(err){
              console.log(err)
              res.send(err)
            }else{
              console.log('document deleted...')
              res.send(doc)
            }
            db.close()
          });
        }
    }); 
})
app.listen(port, () => {
  console.log(`todo server app listening on port ${port}!`)
});