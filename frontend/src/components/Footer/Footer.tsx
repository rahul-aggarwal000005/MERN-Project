import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <footer
      style={{
        position: "relative",
        display: "flex",
        bottom: 0,
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3"> Copyright &copy; Note Zipper</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
