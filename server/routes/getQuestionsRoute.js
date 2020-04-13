const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017';
let dbName = "stackoverflow"
let db
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    db = client.db(dbName)
})
router.use(bodyParser.json())
router.get('/', (req, res) => {
    db.collection('questions').find({}).toArray(function (err, result) {
        if (err) res.send("err")
        if (result) {
           res.send(result)
        }
    })
})
router.get('/:questionId', (req, res) => {
    db.collection('questions').findOne({_id:require('mongodb').ObjectId(req.params.questionId)},function (err, result) {
        if (err) res.send("err")
        if (result) {
           res.send(result)
        }
    })
})
module.exports = router