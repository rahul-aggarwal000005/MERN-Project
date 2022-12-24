import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     // console.log(userInfo);
  //     navigate("/mynotes");
  //   }
  // }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row className="title__container">
          <Col className="text-center">
            <h1 className="title"> Welcome to Note Zipper </h1>
          </Col>
        </Row>
        <Row className="subtitle__container">
          <Col className="text-center">
            <p className="subtitle"> One Safe place for all your notes </p>
          </Col>
        </Row>
        <Row className="button__container mt-3">
          <Col className="d-flex justify-content-center">
            <Button variant="primary landingbutton mr-3" href="/login">
              Login
            </Button>
            <Button variant="outline-primary landingbutton" href="/register">
              Sign Up
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
