import React from "react";
import MainScreenLayout from "../../components/MainScreen/MainScreenLayout";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import notes from "./data/notes";

const MyNotes: React.FC = () => {
  const deleteHandler = (noteId: number | string) => {
    if (window.confirm("Are you sure ?")) {
    }
  };
  return (
    <MainScreenLayout title="Welcome Rahul Aggarwal ...">
      <Link to="createnote">
        <Button size="lg">Create New Note</Button>
      </Link>
      {notes.map((note) => (
        <Accordion>
          <Accordion.Item eventKey={`${note._id.toString()}`}>
            <Card className="my-2" key={note._id}>
              <Card.Header className="d-flex">
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    alignSelf: "center",
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <Accordion.Header as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Header>
                </span>
                <div>
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
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Create on - Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreenLayout>
  );
};

export default MyNotes;
