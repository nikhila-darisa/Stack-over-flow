const express = require('express')
const app = express()
const addUserRoute = require('./routes/addUserRoute')
const addQueryRoute = require('./routes/addQuery')
const getQuestionsRoute = require('./routes/getQuestionsRoute')
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';
const bodyParser = require('body-parser')
let dbName = "stackoverflow"
let db
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    db = client.db(dbName)
})
app.use(cors())
app.use('/user',addUserRoute)
app.use('/postQuery',addQueryRoute)
app.use('/getData',getQuestionsRoute)
app.get('/:question',(req,res)=>{
    db.collection('questions').find({title:req.params.question}).toArray(function(err,result){
        if(err) res.send(err)
        if(result){
            res.send(result)
        }else{
            res.send("invalid request")
        }
    })
})
const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log("port listening on", PORT) })