import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbars() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand">
          AI Assistant
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggle"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/Chatbot" className="nav-link">
              Chatbot
            </Link>
            <Nav.Link Link to="/CodeReview" className="nav-link">
              Code Review
            </Nav.Link>
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              className="nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1" className="dropdown-item">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="dropdown-item">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="dropdown-item">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="dropdown-item">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
