import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './components/createUser/login'
import Signup from './components/createUser/signup'
import Questionary from './components/getQuestions/questionary'
import Logout from './components/logout'
class Home extends React.Component{
  render(){
    return(
      <Fragment>
        <Router>
          <Route exact path='/' component = {App}/>
          <Route exact path='/user/login' component = {Login}/>
          <Route exact path='/user/signup' component = {Signup}/>
          <Route exact path={`/:question`} component={Questionary}/>
          <Route exact path='/user/logout' component={Logout}/>
        </Router>
      </Fragment>
    )
  }
}
ReactDOM.render(
    <Home />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
