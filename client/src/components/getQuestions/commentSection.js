import React,{Fragment}from 'react'

function CommentSection({comments}){
    return(
        <Fragment>
            {comments?comments.map((data,index)=>{
                return <div key={index}>
                <li style={{"fontSize":"14px"}}>{data.repliedData} &nbsp; by <span style={{"color":"brown"}}>{data.email}</span></li>
                </div>
            }):"No comments"}
        </Fragment>
    )
}
export default CommentSection