import React, { useEffect, useState } from 'react'
import MainScreenLayout from '../../components/MainScreen/MainScreenLayout'
import { Link, useNavigate } from 'react-router-dom'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteNote, listNotes } from '../../features/actions/noteActions'
import Loader from '../../components/Loader/Loader'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import ReactMarkdown from 'react-markdown'

type Note = {
  _id: string
  title: string
  content: string
  category: string
}

type Props = {
  search: string
}
const MyNotes: React.FC<Props> = ({ search }) => {
  // const [listNotes, setNotes] = useState<Note[]>([])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const noteList = useAppSelector((state) => state.noteList)
  const userLogin = useAppSelector((state) => state.userLogin)
  const noteUpdate = useAppSelector((state) => state.noteUpdate)
  const noteDelete = useAppSelector((state) => state.noteDelete)
  // const userLogin = useAppSelector((state) => state.userLogin);
  const { error, loading, notes } = noteList
  const { success: updateSuccess, error: updateError } = noteUpdate
  const { success: deleteSuccess, error: deleteError } = noteDelete

  const { userInfo } = userLogin

  const deleteHandler = (noteId: number | string) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteNote(noteId.toString()))
    }
  }
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
      return
    }

    dispatch(listNotes())
  }, [
    search,
    dispatch,
    updateSuccess,
    updateError,
    deleteSuccess,
    deleteError,
    userInfo,
  ])

  // console.log(notes);
  return (
    <MainScreenLayout title={`Welcome ${userInfo ? userInfo.name : ''} ...`}>
      <Link to="/createnote">
        <Button size="lg">Create New Note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {deleteError && (
        <ErrorMessage variant="danger">{deleteError}</ErrorMessage>
      )}
      {updateError && (
        <ErrorMessage variant="danger">{updateError}</ErrorMessage>
      )}
      {updateSuccess && (
        <ErrorMessage variant="success">Update Successfully</ErrorMessage>
      )}
      {deleteSuccess && (
        <ErrorMessage variant="success">Deleted Successfully</ErrorMessage>
      )}

      {loading && <Loader />}
      {notes
        .filter((filterNote) =>
          filterNote.title.toLowerCase().includes(search.toLowerCase()),
        )
        .map((note: any) => (
          <Accordion key={note._id} className="mt-4">
            <Accordion.Item eventKey={`${note._id.toString()}`}>
              <Card className="my-2">
                <Card.Header className="d-flex">
                  <span
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      flex: 1,
                      alignSelf: 'center',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Accordion.Header as={Card.Text} variant="link">
                      {note.title}
                    </Accordion.Header>
                  </span>
                  <div className="m-auto">
                    <Button className="mx-2" href={`/notes/${note._id}`}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge bg="success" text="white">
                        {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Create on - {note.createdAt.substring(0, 10)}
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreenLayout>
  )
}

export default MyNotes
