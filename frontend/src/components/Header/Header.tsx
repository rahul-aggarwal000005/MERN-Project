import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { useAppSelector } from '../../app/hooks'
import { userLogout } from '../../features/slice/userSlice'

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
}
const Header: React.FC<Props> = ({ setSearch }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState('Profile')
  const userLogin = useAppSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(userLogout())
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
    }
  }, [dispatch, navigate, userLogin, name])

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to={'/'}>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link as={Link} to={'/mynotes'}>
                  My Notes
                </Nav.Link>
                <NavDropdown title={`${name}`} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to={'/login'}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
