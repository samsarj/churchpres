import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BibleModal = ({ show, handleClose }) => {
    const [bibleContent, setBibleContent] = {content: "Content"};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bible</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bible logic here.</p>
        {bibleContent}
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
  );
}

export default BibleModal;