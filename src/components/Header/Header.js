import React from "react";
import { Col, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Link, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import './style.css'
import { useStateValue } from "../../StateProvider";
import { auth } from "../../auth/firebase";
import logo from './output-onlinepngtools.png'

function Header(props) {
    const history = useHistory()
    const [{user}] = useStateValue()

    const logout = (e) =>{
        auth.signOut()
        history.push('/signin')
    }

  const loggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Account
          </NavLink>
        </li>
        <hr />
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Logout
          </span>
        </li>
      </Nav>
    );
  };

  const nonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            Sign In
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <div style={{ zIndex: "1", position: 'sticky', top: '0' }}>
      <Navbar
        style={{ zIndex: "1", position: 'sticky', top: '0' }}
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Container fluid>
          <Link to="/dashboard" className="navbar-brand">
            <img style={{width: '5rem'}} src={logo} />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Col md="6">
              <form className="form-inline mt-2 mb-2">
                <SearchIcon/>
                <div className="d-flex justify-content-center w-75">
                    <input
                        className="form-control form-control-sm ml-3 w-100"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                      />
                </div>
              </form>
            </Col>
            <Nav className="mr-auto">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {user ? loggedInLinks() : nonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;