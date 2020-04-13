import React, {Fragment } from 'react'

function RepliedData({ replies }) {
    return (
        <Fragment>
            <div className="container">
                <h4 className="ml-5">{replies.length} Answers</h4>
                <hr />
                {replies.map((data, index) => {
                    return <div key={index}>
                        <br />
                        <div className="row">
                            <div className='col-sm-2'>
                                <div className="vote"> 
                                <button className="btn btn-outline-secondary eachSeat" value='1' style={{backgroundColor:''}}>^</button>&nbsp;
                                </div>
                                <div className="vote">{0}</div>
                                <div className="vote"><button className="btn btn-outline-secondary eachSeat" value='1' style={{backgroundColor:''}}>^</button></div>
                            </div>
                            <div className='col-sm-8'>

                                <br />
                                <p>{data.description}</p>
                                <br/>
                                <div className="userData mt-2">
                                    <span>Posted by <span style={{"color":"brown"}}>{data.email}</span></span>
                                    <span><h4 className="letter">{data.email.charAt(0)} </h4></span>
                                </div>
                                {/* <p className="userData" name={data} onClick={showInputBox} style={{ "backgroundColor": "white" }}>Add Comment</p>
                                <textarea type="text" onChange={getText} className="form-control" style={{ "display": displayValue }}></textarea> */}
                            </div>
                            <div className='col-sm-2'>
                            </div>
                        </div>
                        <hr />
                    </div>
                })}

            </div>
        </Fragment>
    )
}
export default RepliedData

