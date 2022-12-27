import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';

export const FullHeader = (props) => {
  const [email,setEmail] = useState("Xinqi");

  return ( 
    <Navbar>
      <Container>
        {/* <Navbar.Brand href="/login">Navbar with text</Navbar.Brand> */}
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/intervention">Newintervention</Nav.Link>
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/login">{email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

