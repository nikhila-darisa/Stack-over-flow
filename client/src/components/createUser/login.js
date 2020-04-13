import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            loginValidation: {
                isEmailValid: true,
                isPasswordValid: true,
                isFormValid: true
            }
        }
    }
    onInputChange = (event) => {
        let name = event.target.name
        this.setState({
            [name]: event.target.value
        })
    }
    validateUser = () => {
        let newValidation = {
            isEmailValid: true,
            isPasswordValid: true,
            isFormValid: true
        }
        if (this.state.email === ''){
            newValidation.isEmailValid = false
            newValidation.isFormValid=false
        } 
        if(this.state.password === '') {
           newValidation.isPasswordValid = false
           newValidation.isFormValid = false
        }
        this.setState({
            loginValidation: newValidation
        })
        return newValidation.isFormValid
    }
    submitForm = (event) => {
        event.preventDefault()
        if (this.validateUser()) {
            let data = {
                email : this.state.email,
                password : this.state.password
            }
            axios.post('/user/login',data).then((res)=>{
                if(res.data === 'not available'){
                    alert("Invalid User")
                }else{
                    localStorage.setItem('userId',res.data)
                    localStorage.setItem('email',this.state.email)
                    this.props.history.push('/')
                }
            }).catch((err)=>{console.log(err)})
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-6 mt-5">
                            <form onSubmit={this.submitForm}>
                                {
                                    !this.state.loginValidation.isEmailValid && <span className="text-danger">invalid Email</span>
                                }
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" name="email" className={`form-control ${!this.state.loginValidation.isEmailValid && "is-invalid"}`} onChange={this.onInputChange} />
                                </div>
                                {
                                    !this.state.loginValidation.isPasswordValid && <span className="text-danger">Invalid password</span>
                                }
                                <div className="form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" name="password" className={`form-control ${!this.state.loginValidation.isPasswordValid && "is-invalid"}`} onChange={this.onInputChange} />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                    <div className='col-6 text-right'>
                                        <Link className="btn btn-primary" to='/user/signup'>Sign up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;