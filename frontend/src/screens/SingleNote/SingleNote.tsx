import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Loader from '../../components/Loader/Loader'
import MainScreenLayout from '../../components/MainScreen/MainScreenLayout'
import {
  createNote,
  deleteNote,
  updateNote,
} from '../../features/actions/noteActions'

const CreateScreen = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [updatedAt, setUpdateAt] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const noteUpdate = useAppSelector((state) => state.noteUpdate)
  const { loading, success, error } = noteUpdate
  const { id } = useParams()
  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get(`/api/notes/${id}`)
      if (!data.title || !data.content || !data.category || !data.updatedAt) {
        navigate('/mynotes')
      }
      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setUpdateAt(data.updatedAt)
    }
    fetchNotes()
  }, [id, navigate])

  const deleteHandler = () => {
    console.log('deleting')
    dispatch(deleteNote(id))
    navigate('/mynotes')
  }

  const updateNoteHandler = async (e: any) => {
    e.preventDefault()
    if (!title || !content || !category) return
    dispatch(updateNote(id, title, content, category))
    navigate('/mynotes')
  }
  return (
    <MainScreenLayout title="Update Note">
      <Card>
        <Card.Header>Update the Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateNoteHandler}>
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
                  Update Note
                </Button>
                <Button variant="danger" onClick={deleteHandler}>
                  Delete Note
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
        <Card.Footer>
          Last Updated on - {updatedAt.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreenLayout>
  )
}

export default CreateScreen
