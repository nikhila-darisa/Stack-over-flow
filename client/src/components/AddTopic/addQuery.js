import React, { Fragment, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from '../config/axios'
import  { Redirect } from 'react-router-dom'
function MyVerticallyCenteredModal(props) {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        titleValid: '',
        descriptionValid: '',
        userId : localStorage.getItem('userId'),
    })
    const formValidation = () => {
        let formValidMsg = true
        const { title, description } = details
        if (title.length <= 0) {
            details.titleValid = "Title is missing"
            formValidMsg = false
        }
        if (description.length <= 0) {
            details.descriptionValid = 'Description is missing'
            formValidMsg = false
        }
        setDetails({
            ...details,
        })
        return formValidMsg
    }
    const [successMsg,updateMsg] = useState(false)
    const submitForm = (e) => {
        e.preventDefault()
        if (formValidation()) {
            axios.post('/postQuery',details).then((msg)=>{updateMsg(true)
                setTimeout(updateMsg(true),1000)
            }).catch((err)=>{console.log("err")}) 
        }
        
    }
    const getValue = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        switch (name) {
            case 'title': {
                if (value.length === 0) {
                    details.titleValid = "Title is missing"
                } else if (value.length < 10) {
                    details.titleValid = "Title must be at least 10 characters."
                } else {
                    details.titleValid = ''
                }
                break;
            }
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
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Post Your Question
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {successMsg?
                <div className="alert alert-success">Successfully posted</div>:null}
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" name="title" onChange={getValue} className={`form-control ${details.titleValid && 'is-invalid'}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {details.titleValid !== '' ? <span className="text-danger">{details.titleValid}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <textarea type="text" name="description" onChange={getValue} rows="6"
                            className={`form-control ${details.descriptionValid && 'is-invalid'}`} />
                        {details.descriptionValid !== '' ? <span className="text-danger">{details.descriptionValid}</span> : null}
                    </div>
                    <button onClick={submitForm} className="btn btn-info">+ Add Query</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
function AddQuery() {
    const [modalShow, setModalShow] = React.useState(false);
    const [redirectPage, setRedirect] = React.useState(null);
    const [text, setValue] = useState("+")
    const changeValue = () => {
        let name = "+ Ask Question"
        if (text === "+") {
            setValue(name)
        } else {
            let data = "+"
            setValue(data)
        }
    }
    let email 
    const verifyUser = ()=>{
        email = localStorage.getItem('email')
        if(email){
            setModalShow(true)
        }else{
            setRedirect("getLogin")
        }
    }
    return (
        <Fragment>
            <button className="pulsbutton btn btn-dark" onClick={verifyUser} onMouseOver={changeValue} onMouseOut={changeValue}><span className="plusopp"><b>{text}</b></span></button>
           <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {redirectPage==="getLogin"?<Redirect to='/user/login'  />:null}
        </Fragment>
    )

}
export default AddQuery