import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'
import MainScreenLayout from '../../components/MainScreen/MainScreenLayout'
import { createNote } from '../../features/actions/noteActions'

const CreateScreen = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const noteCreate = useAppSelector((state) => state.noteCreate)
  const { loading, success, error } = noteCreate

  const resetHandler = () => {
    setTitle('')
    setCategory('')
    setContent('')
  }

  const createNoteHandler = async (e: any) => {
    e.preventDefault()
    if (!title || !content || !category) return
    dispatch(createNote(title, content, category))
    resetHandler()
    navigate('/mynotes')
  }
  return (
    <MainScreenLayout title="Create Note">
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form onSubmit={createNoteHandler}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: 100 }}
                placeholder="Enter the content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header> Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loader />}
                <Button variant="primary" type="submit" className="mr-2">
                  Create Note
                </Button>
                <Button variant="danger" onChange={resetHandler}>
                  Reset Fields
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        <Card.Footer>Create on - {new Date().toLocaleDateString()}</Card.Footer>
      </Card>
    </MainScreenLayout>
  )
}

export default CreateScreen
