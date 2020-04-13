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
router.post('/', (req, res) => {
    const { title, description, userId} = req.body
    console.log('eje')
    db.collection('questions').insertOne({ title, question: description, replies: [], userId,comments:[],votes:0,marked:false }, function (err, result) {
        if (err) res.send(err)
        if (result) {
            let newId = result.insertedId
            let details = { questionId: newId, comments: [], replies: [], votes: 0, marked: false }
            db.collection('UserDetails').updateOne({ _id: require('mongodb').ObjectId(userId) }, { $push: { questions: details } }, (err, result) => {
                if (err) res.send(err)
                if (result) {
                    res.send("Successfully posted")
                }
            })
        }
    })
})
router.use(bodyParser.json())
router.post('/postReply', (req, res) => {
    const { description, userId, QuestionId,email } = req.body
    console.log(typeof(require('mongodb').ObjectId(QuestionId)))
    db.collection('questions').updateOne({ _id: require('mongodb').ObjectId(QuestionId) }, { $push: { replies:  {description, userId,votes:0,marked:false,email}  } }, (err, result)=> {
        if (err) res.send(err)
        if (result) {
            // console.log(result)
            res.send("Successfully posted")
        }
    })
})
router.post('/addReply',(req,res)=>{
    const {presentUser,repliedData,QuestionId,email} = req.body
    db.collection('questions').updateOne({ _id: require('mongodb').ObjectId(QuestionId) }, { $push: { comments:  {repliedData,user:presentUser,email}  } }, (err, result)=> {
        if (err) res.send(err)
        if (result) {
            res.send("Successfully Added your reply")
        }
    })
})
module.exports = router