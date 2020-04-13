import React from 'react';
class Logout extends React.Component {
  componentDidMount(){
    localStorage.clear()
    this.props.history.push('/')
  }
  render(){
    return (
      <h1>logout</h1>
    )
  }
}
export default Logout;
