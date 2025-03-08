import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import TiptapEditor from "./TiptapEditor";

const LyricsEditor = ({ show, onHide, content, setContent }) => {
  const handleSave = () => {
    const updatedContent = parseEditorContent();
    console.log(updatedContent);
    // setContent(updatedContent);
    // onHide();
  };

  const parseEditorContent = () => {
    const tempButtonGroup = document.createElement("ButtonGroup");
    tempButtonGroup.innerHTML = editorContent;

    const newContent = [];
    let currentVerse = null;
    let currentLyrics = "";

    tempButtonGroup.childNodes.forEach((node) => {
      if (node.tagName === "H3") {
        if (currentVerse) {
          newContent.push({ verse: currentVerse, lyrics: currentLyrics.trim() });
        }
        currentVerse = node.innerText;
        currentLyrics = "";
      } else if (node.tagName === "P") {
        currentLyrics += node.innerText + "\n";
      }
    });

    if (currentVerse) {
      newContent.push({ verse: currentVerse, lyrics: currentLyrics.trim() });
    }

    return newContent;
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Lyrics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TiptapEditor content={content} setContent={setContent} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LyricsEditor;
