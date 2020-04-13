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
// router.use(bodyParser.urlencoded({ extended: false }))
router.post('/',(req,res)=>{
    db.collection('UserDetails').insertOne({...req.body,questions:[],votedQuestions:[],markAnswer:[],repliedAnswers:[]}, function (err, result) {
        if (err) res.json(err)
        if(result){
        res.json('success')
        }
    })
})
router.post('/login', (req, res) => {
    const { email, password } = req.body
    var userId
    console.log(req.body)
    console.log(email,password)
    db.collection('UserDetails').find({}).toArray(function (err, result) {
        let flag = false
        if (err) res.send("err")
        if (result) {
            for(var i = 0; i < result.length; i++) {
                if (result[i].email == email && result[i].password == password) {
                    flag = true;
                    userId = result[i]._id
                }
            }
            if(flag) {
                res.json(userId)
            }else{
                res.json("not available")
            }
        }
    })
})
router.get('/getUserData/:getUserId',(req,res)=>{
    db.collection('UserDetails').findOne({_id:require('mongodb').ObjectId(req.params.getUserId)},function(err,result){
        if(err) res.send("err")
        if(result){
            res.send(result)
        }
    })
})
module.exports = router