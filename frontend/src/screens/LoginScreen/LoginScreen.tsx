import React, { FormEvent, useEffect, useState } from 'react'
import MainScreenLayout from '../../components/MainScreen/MainScreenLayout'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login } from '../../features/actions/userActions'
const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<number | string>('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const userLogin = useAppSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes')
    }
  }, [navigate, userInfo])

  return (
    <MainScreenLayout title="LOGIN">
      <div style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
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
  )
}

export default LoginPage
