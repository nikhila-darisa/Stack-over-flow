import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'
class Signup extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            formvalidation: {
                isEmailValid: true,
                isPasswordValid: true,
                isConfirmPasswordValid: true,
                isFormValid: true,
                islogin: true,
            }
        }
    }
    inputChange = (event) => {
        let name= event.target.name
        this.setState({
            [name]: event.target.value,
        })
    }
    validationForm = () => {
        let newFormValidation = {
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmPasswordValid: true,
            isFormValid: true,
            islogin: true
        }
        if (!this.state.email) {
            newFormValidation.isEmailValid = false
            newFormValidation.isFormValid = false
            newFormValidation.islogin = false
        }
        if (!this.state.password) {
            newFormValidation.isPasswordValid = false
            newFormValidation.isFormValid = false
            newFormValidation.islogin = false
        }
        if (!this.state.confirmpassword) {
            newFormValidation.isConfirmPasswordValid = false
            newFormValidation.isFormValid = false
            newFormValidation.islogin = false
        }
        if (this.state.password !== this.state.confirmpassword) {
            newFormValidation.isConfirmPasswordValid = false
            newFormValidation.isFormValid = false
            newFormValidation.islogin = false
        }
        this.setState({
            formvalidation: newFormValidation
        })
        return newFormValidation.isFormValid
    }
    onSubmitForm = (event) => {
        event.preventDefault()
        if (this.validationForm()) {
            let userRegisterData = {
                email: this.state.email,
                password: this.state.password,
                confirmpassword: this.state.password,
            }
            try{
                axios.post('/user',userRegisterData).then((msg)=>{
                    // localStorage.setItem('email', JSON.stringify(userRegisterData.email))
                    this.props.history.push('/user/login')
                }).catch((err)=>{console.log("err")}) 
            }catch(err){
                console.log(err)
            }
        }

    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid" style={{backgroundColor: "white"}}>
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 mt-5">
                            {
                                !this.state.formvalidation.isFormValid && <div className="alert alert-danger mt-4 mr-4 ml-4" role="alert">Invalid form</div>
                            }

                            <form onSubmit={this.onSubmitForm}>
                            
                                {
                                    !this.state.formvalidation.isEmailValid && <span className="text-danger">invalid Email</span>
                                }
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" name="email" className={`form-control ${!this.state.formvalidation.isEmailValid && "is-invalid"}`} onChange={this.inputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className={`form-control ${!this.state.formvalidation.isPasswordValid && "is-invalid"}`} onChange={this.inputChange} />
                                </div>
                                {
                                    !this.state.formvalidation.isConfirmPasswordValid && <span className="text-danger">password and confirmPassword should be same</span>
                                }
                                <div className="form-group">
                                    <label htmlFor="">Confirm Password</label>
                                    <input type="password" name="confirmpassword" className={`form-control ${!this.state.formvalidation.isConfirmPasswordValid && "is-invalid"}`} onChange={this.inputChange} />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-primary" type="submit">Sign up</button>
                                    </div>
                                    <div className='col-6 text-right'>
                                        <Link className="btn btn-primary" to='/user/login'>Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Signup;