import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'
function DisplayQuestions() {
    const [questions, setQuestions] = useState(null)
    useEffect(() => {
        let getDetails = async () => {
            try {
                let result = await axios.get('/getData')
                setQuestions(result.data)
            } catch (err) {
                console.log("Error")
            }
        }
        getDetails()
    }, [questions])
    return (
        <Fragment>
            {questions ? <div className="container mt-5 ml-5 mr-5">
                {questions.length > 0 ? <div>
                    {questions.map((data, index) => {
                        let query = data.title.split(' ').join('-')
                        let id = data._id
                        return <div key={index}>
                            <div className="row">
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-8">
                                    <Link to={{
                                        pathname: `/${query}`, state: {
                                            questionId: id
                                        }
                                    }} style={{ "textDecoration": 'none' }}><p className="list-group-item list-group-item-secondary mb-3">{data.title}</p></Link>
                                </div>
                                <div className="col-sm-2">
                                </div>
                            </div>
                        </div>
                    })}

                </div> : <h1>No questions</h1>}


            </div> : "null"}
        </Fragment>
    )
}
export default DisplayQuestions