import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

const Bible = ({ }) => {
  const [show, setShow] = useState(false);
  const [bibleContent, setBibleContent] = useState({content: "Content"});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddToService = () => {
    console.log("Adding Bible to service");
    handleClose();
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
      <Button variant="primary" onClick={handleShow}>
        Add Bible Passage
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bible</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bible logic here.</p>
          {bibleContent.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddToService}>
            Add to Service
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Bible;
