import React, { FormEvent, useState } from "react";
import MainScreenLayout from "../../components/MainScreen/MainScreenLayout";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { MDBFile } from "mdb-react-ui-kit";
import axios, { AxiosError } from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
  );
  const [message, setMessage] = useState<boolean | string>(false);
  const [picMessage, setPicMessage] = useState<string | boolean>(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do not Match");
    } else {
      setMessage(false);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          { name, pic, email, password },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          // console.log(error.response.data.message);
          setError(error.response.data.message);
          setLoading(false);
        }
      }
    }
    console.log(email);
  };

  const postDetail = (pics: any) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    setPicMessage(false);
    const uploadedFile = pics[0];
    if (
      uploadedFile.type === "image/png" ||
      uploadedFile.type === "image/jpeg" ||
      uploadedFile.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", uploadedFile);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dzwv9oaff");
      fetch("https://api.cloudinary.com/v1_1/dzwv9oaff/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPicMessage("Please select an image");
    }
  };

  return (
    <MainScreenLayout title="REGISTER">
      <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <MDBFile
              placeholder="Upload your picture"
              accept="image/*"
              id="customFile"
              onChange={(e) => postDetail(e.target.files)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-2">
          <Col>
            Already Registered ? <Link to="/login">Login Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreenLayout>
  );
};

export default RegisterPage;
