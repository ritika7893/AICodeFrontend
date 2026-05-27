import React from 'react'
import { Row, Col } from 'react-bootstrap';
function Footer() {
  return (
    <>
      <Row>
        <Col lg={4} md={4} sm={12} className="text-center">Section 1</Col>
        <Col lg={4} md={4} sm={12} className="text-center">Section 2</Col>
        <Col lg={4} md={4} sm={12} className="text-center">Section 3</Col>
      </Row>
    </>
  );
}

export default Footer
