import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-white py-3 w-100">
      <Container fluid className='p-0'>
        <Row className="justify-content-center mb-2 mx-0">
          <Col xs="auto" className="text-center mb-3">
            <Nav className="justify-content-center gap-1">
              <Nav.Link as={Link} to="/about" className="text-white">About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/social" className="text-white">Social Media</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h6>Copyright © {currentYear}, GoGreener. All rights reserved.</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


