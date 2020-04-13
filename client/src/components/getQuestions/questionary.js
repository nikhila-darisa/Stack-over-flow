import React, { Fragment, useEffect, useState } from 'react'
import axios from '../config/axios'
import NavBar from '../navbar/navbar'
import RepliedData from './repliedData'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentBox from './commentSection'
function Questionary({ location }) {
    const QuestionId = location.state.questionId;
    const [questions, setQuestions] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    const [displayValue, setDisplayValue] = useState("none")
    const [displayReplyValue, setDisplayReplyValue] = useState("none")
    const [successMsg, updateMsg] = useState(false)
    const [replies, setReplies] = useState(null)
    const [userComments, setComments] = useState(null)
    useEffect(() => {
        let getDetails = async () => {
            try {
                let result = await axios.get(`/getData/${QuestionId}`)
                setQuestions(result.data)
                console.log(result.data)
                setUserId(result.data.userId)
                setReplies(result.data.replies)
                setComments(result.data.comments)
                if (userId) {
                    let newData = await axios.get(`/user/getUserData/${userId}`)
                    if (newData) {
                        setUserDetails(newData.data)
                    }
                }
            } catch (err) {
                console.log("Error")
            }
        }
        getDetails()
    }, [QuestionId, userId, userDetails])
    const showInputBox = () => {
        if (displayValue === "none") {
            setDisplayValue("inline")
        } else {
            setDisplayValue("none")
        }
    }
    const showReplyBox = () => {
        setDisplayReplyValue("inline")
    }
    const close = (e) => {
        e.preventDefault()
        setDisplayReplyValue("none")
        updateMsg(false)
    }
    const closeCommentBox = (e) => {
        e.preventDefault()
        setDisplayValue("none")
        updateMsg(false)
    }
    const [repliedData, setRepliedData] = useState(null)
    const [errReplyMsg, setErrReplyMsg] = useState(false)
    const getText = (e) => {
        let data = e.target.value
        if (data.length <= 0) {
            setErrReplyMsg(false)
        }
        if (data.length > 0) {
            setErrReplyMsg(true)
        }
        setRepliedData(data)
    }
    let presentUser = localStorage.getItem('userId')
    let email = localStorage.getItem('email')
    const submitReply = (e) => {
        e.preventDefault()
        if (errReplyMsg) {
            let data = {
                repliedData,
                QuestionId,
                presentUser,
                email
            }
            axios.post('/postQuery/addReply', data).then((res) => {
                toast.warn("successfully replied")
                setDisplayValue("none")
            }).catch((err) => { toast.warn(err) })
        } else {
            toast.warn("should not be empty")
        }
    }
    const [details, setDetails] = useState({
        description: '',
        descriptionValid: '',
        userId: localStorage.getItem('userId'),
        QuestionId,
        email: localStorage.getItem('email')
    })
    const formValidation = () => {
        let formValidMsg = true
        const { description } = details
        if (description.length <= 0) {
            details.descriptionValid = 'Description is missing'
            formValidMsg = false
        }
        if (description.length <= 15) {
            details.descriptionValid = "Description must be atleast 20 characters; you entered "
            formValidMsg = false
        }
        setDetails({
            ...details,
        })
        return formValidMsg
    }
    const getTextAreaValue = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'description': {
                if (value.length === 0) {
                    details.descriptionValid = "Description is missing"
                } else if (value.length < 10) {
                    details.descriptionValid = "Description must be atleast 20 characters; you entered " + value.length
                } else {
                    details.descriptionValid = ''
                }
                break;
            }
            default:
                break;
        }
        setDetails({
            ...details,
            [name]: value
        })
    }
    const submitForm = (e) => {
        e.preventDefault()
        if (formValidation()) {
            axios.post('/postQuery/postReply', details).then((msg) => {
                console.log(msg)
                updateMsg(true)
            }).catch((err) => { console.log("err") })
        } else {
            toast.warn('invalid')
        }
    }
    return (
        <Fragment>
            <NavBar />
            <div className="container mt-5">
                <div className="row">
                    <div className='col-sm-2'>
                        <div className="vote">
                            <button className="btn btn-outline-secondary eachSeat" value='+' style={{ backgroundColor: '' }}>+</button>&nbsp;
                                </div>
                        {questions ?
                            <div className="vote">{questions.votes}</div> : null
                        }
                        <div className="vote"><button className="btn btn-outline-secondary eachSeat" value='-' style={{ backgroundColor: '' }}>-</button></div>
                    </div>
                    <div className='col-sm-8'>
                        <ToastContainer ClassName="toast_container" />
                        {questions ?
                            <div className='questionData'>
                                <h4>{questions.title}</h4>
                                <hr />
                                <p>{questions.question}</p>
                            </div> : null
                        }
                        {userDetails ?
                            <div>
                                <div className="userData">
                                    <span>Posted by <span style={{ "color": "brown" }}>{userDetails.email}</span></span>
                                    <span><h4 className="letter">{userDetails.email.charAt(0)} </h4></span>
                                </div>
                                <hr />
                                {userComments.length > 0 ? <div>
                                    <h6>{userComments.length} Comments</h6>
                                    <hr />
                                    <CommentBox comments={questions.comments} />
                                </div> : "No comments"}
                                {email ?
                                    <p className="userData" onClick={showInputBox} style={{ "backgroundColor": "white" }}>Add Comment</p>
                                    :
                                    <Link to='/user/login' className="userData" >Add Comment</Link>
                                }
                                <div style={{ "display": displayValue }}>
                                    {errReplyMsg === false ? <p className="text-danger">Should not be empty</p> : null}
                                    <textarea type="text" onChange={getText} className="form-control" style={{ "display": displayValue }}></textarea>
                                    <button onClick={submitReply} className="btn btn-info">Submit</button>
                                    <button onClick={closeCommentBox} className="btn btn-primary ml-5">Close</button>
                                </div>
                                <div style={{ "display": displayReplyValue }}>
                                    {successMsg ?
                                        <div className="alert alert-success">Successfully posted</div> : null}
                                    <form>
                                        <h4>Add Answer</h4>
                                        {details.descriptionValid !== '' ? <span className="text-danger">{details.descriptionValid}</span> : null}
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1"></label>
                                            <textarea type="text" onChange={getTextAreaValue} className="form-control" name="description" />
                                        </div>
                                        <button onClick={submitForm} className="btn btn-info">+ Add Query</button>
                                        <button onClick={close} className="btn btn-primary ml-5">Close</button>
                                    </form>
                                </div>
                            </div> : "Loading...."
                        }
                    </div>
                    <div className='col-sm-2'>
                        {email ?
                          <button onClick={showReplyBox} className="btn btn-info">Reply</button>
                            :
                            <Link to='/user/login' className="btn btn-info">Reply</Link>
                        }

                    </div>
                </div>
            </div>
            {replies ?
                <RepliedData replies={replies} showInputBox={showInputBox} />
                : "Loading..."}
        </Fragment>
    )
}
export default Questionary