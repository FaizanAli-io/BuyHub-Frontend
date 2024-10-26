import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';

function Home() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Shop by Category</Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Price</Dropdown.Item>
                  <Dropdown.Item href="#">Rating</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link href="#">My Account</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search" className="me-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-5 text-center">
        <h1>Welcome to our E-Commerce site!</h1>
        <p>Browse and shop with ease.</p>
      </Container>
    </div>
  );
}

export default Home;
