import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3 mt-auto mb-4 w-100">
      <div className='w-100'>
        <Row className="justify-content-center">
          <Col className="text-center mb-3">
            <Nav className="justify-content-center gap-3">
              <Nav.Link href="/about" className="text-white">About Us</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Contact Us</Nav.Link>
              <Nav.Link href="/social" className="text-white">Social Media</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            Copyright © {currentYear}, GoGreener. All rights reserved.
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
