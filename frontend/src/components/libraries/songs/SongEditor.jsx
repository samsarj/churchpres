import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import songs from "./songs.json";

import SlideController from "../../global/SlideController";
import LyricsEditor from "./LyricsEditor";
import { v4 as uuidv4 } from "uuid";
import SlideOrder from "./SlideOrder";

const SongEditor = () => {
  const song = songs[0];
  const [title, setTitle] = useState(song.name || "");
  const [altTitle, setAltTitle] = useState(song.altTitle || "");
  const [songId, setSongId] = useState(song.songId || "");
  const [content, setContent] = useState(song.content || []);
  const [order, setOrder] = useState(
    song.order
      ? song.order.map((slide) => ({ id: uuidv4(), shorthand: slide }))
      : []
  );
  const [theme, setTheme] = useState(song.theme || "");
  const [authorship, setAuthorship] = useState(song.authorship || {});

  const [editSlide, setEditSlide] = useState(0);

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    // onSave();
    setShow(false);
  };

  const handleEditSlide = (index) => {
    // open another modal to edit slide
  };

  const handleEditSlides = () => {
    setShowLyricsEditor(true);
  };

  const handleCloseLyricsEditor = () => {
    setShowLyricsEditor(false);
  };

  const [showLyricsEditor, setShowLyricsEditor] = useState(false);

  const handleDeleteSlide = (index) => {
    // delete slide
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Song: {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="information"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="information" title="Title & Authorship">
              <FloatingLabel
                controlId="floatingInput"
                label="Song Title"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" value={title} onChange={
                  (e) => setTitle(e.target.value)
                }/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Alternative Title"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" value={altTitle} onChange={
                  (e) => setAltTitle(e.target.value)
                }/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Composer"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" value={authorship.composer} onChange={
                  (e) => setAuthorship({ ...authorship, composer: e.target.value })
                }/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Lyricist"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="" value={authorship.lyricist} onChange={
                  (e) => setAuthorship({ ...authorship, lyricist: e.target.value })
                }/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Copyright Information"
                // className="mb-3"
              >
                <Form.Control type="text" placeholder="" value={authorship.copyright} onChange={
                  (e) => setAuthorship({ ...authorship, copyright: e.target.value })
                }/>
              </FloatingLabel>
            </Tab>
            <Tab eventKey="content" title="Content">
              Lyrics
              <SlideController
                useOrder={false}
                item={song}
                setActiveSlide={setEditSlide}
              />
              <ButtonGroup className="w-100" size="sm">
                <Button variant="primary" onClick={handleEditSlides}>
                  Edit All
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleEditSlide(editSlide)}
                >
                  Edit {content.map((slide) => slide.verse)[editSlide]}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteSlide(editSlide)}
                >
                  Delete {content.map((slide) => slide.verse)[editSlide]}
                </Button>
              </ButtonGroup>
              <SlideOrder content={content} order={order} setOrder={setOrder} />
            </Tab>
            <Tab eventKey="theme" title="Theme">
              Tab content for Theme
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {showLyricsEditor && (
        <LyricsEditor
          show={showLyricsEditor}
          onHide={handleCloseLyricsEditor}
          content={content}
          setContent={setContent}
        />
      )}
    </>
  );
};

export default SongEditor;
