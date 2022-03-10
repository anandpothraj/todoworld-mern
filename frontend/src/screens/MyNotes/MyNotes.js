import React , { useEffect } from 'react';
import { Accordion, Badge, Button , Card } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

import { useDispatch , useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ history, search }) => {
    const dispatch = useDispatch();

    const noteList = useSelector(state => state.noteList);
    const { loading, notes, error } = noteList ; 

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success:successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading:loadingDelete , error:errorDelete, success: successDelete } = noteDelete;

    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            history.push("/");
        }
      }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        successUpdate,
      ]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteNoteAction(id))
        }
    };

    return (
        <MainScreen title={`Welcome ${userInfo && userInfo.name}...`}>
            <Link to='/createnote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {loadingDelete && <Loading/>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
                {notes &&
                    notes
                    .filter((filteredNote) =>
                        filteredNote.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map((note) => ( 
                        <Accordion defaultActiveKey="0" key={note._id}>
                            <Card style={{ margin: 10 }} >
                                <Accordion.Item>
                                    <Card.Header style={{ display: "flex" }}>
                                        <span
                                            style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18
                                            }}
                                        >
                                            <Accordion.Header as={Card.Text} 
                                            variant="link" eventkey="0">{note.title}</Accordion.Header>
                                        </span>
                                        <div className="ml-2" >
                                            <Button href={`/note/${note._id}`}>Edit</Button>
                                            <Button
                                                variant="danger"
                                                className="mx-2"
                                                onClick={() => deleteHandler(note._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                    <Accordion.Body eventkey="0">
                                        <h4>
                                            <Badge variant="Success" bg="success">
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <ReactMarkdown>{note.content}</ReactMarkdown>
                                        <footer className="blockquote-footer">
                                            Created on {" "}
                                            <cite title="Source Title">
                                                {note.createdAt.substring(0, 10)}
                                            </cite>
                                        </footer>
                                        </blockquote>
                                        </Accordion.Body>
                                    </Card.Body>
                                </Accordion.Item>    
                            </Card>
                        </Accordion>
                    ))
                }
        </MainScreen>
    )
}

export default MyNotes;