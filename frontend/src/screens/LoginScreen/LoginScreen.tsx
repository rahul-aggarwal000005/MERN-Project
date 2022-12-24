import React, { FormEvent, useEffect, useState } from "react";
import MainScreenLayout from "../../components/MainScreen/MainScreenLayout";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<number | string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      // console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        // console.log(error.response.data.message);
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <MainScreenLayout title="LOGIN">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-2">
          <Col>
            New Customer ? <Link to="/register">Register Here </Link>
          </Col>
        </Row>
      </div>
    </MainScreenLayout>
  );
};

export default LoginPage;
