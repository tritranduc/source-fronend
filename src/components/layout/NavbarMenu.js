import React, { useContext } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import mainIcon from '../../assets/facebook.png'
import { AuthContext } from '../../contexts/authContext'
import FormSearchNavbar from './FormSearchNavbar'

const NavbarMenu = () => {
  var {
    stateAuth: { user },
    logoutUser,
  } = useContext(AuthContext)
  var logout = () => {
    logoutUser()
  }
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
        <Navbar.Brand
          href="/dashboard"
          className="font-weight-border text-white"
        >
          <img
            src={mainIcon}
            alt="learnItLogo"
            width="32"
            height="32"
            className="mr-2 d-inline-block align-top"
          />{' '}
          faceXi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <FormSearchNavbar></FormSearchNavbar>

          <Nav className="mr-auto container">
            <Nav.Link
              to="/dashboard"
              as={Link}
              className="font-weight-bolder text-white"
            >
              homePage
            </Nav.Link>
            <Nav.Link
              to="/my-page"
              as={Link}
              className="font-weight-bolder text-white"
            >
              my fan page
            </Nav.Link>
            <Nav.Link
              to="/about"
              as={Link}
              className="font-weight-bolder text-white"
            >
              about
            </Nav.Link>
          </Nav>
          <Nav className="right mr-auto container">
            <Nav.Link className="font-weight-bolder text-white" disabled>
              Welcome {user.username}
            </Nav.Link>
            <Button
              variant="secondary"
              className="font-weight-bolder text-white"
              onClick={logout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarMenu
