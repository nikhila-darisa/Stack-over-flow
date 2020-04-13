import React, { Fragment } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
class NavBar extends React.Component {
    Logout = ({history})=>{
        localStorage.clear()
        history.push('/')
    }
    render() {
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/" style={{ "color": "white", "fontWeight": "6000" }}>StackOver<b>Flow</b></Nav.Link>
                        {/* <Nav.Link href="/">Home</Nav.Link> */}
                    </Nav>
                   
                    <Nav className="ml-auto">
                        {localStorage.getItem('email') ?
                            <Nav.Link href="/user/Logout"   style={{ "color": "white" }}>Logout</Nav.Link>
                            :
                            <Nav.Link href="/user/login"  style={{"color":"white"}}>Login</Nav.Link>

                }
                    </Nav>
                </Navbar>
            </Fragment>
        )
    }
}
export default NavBar