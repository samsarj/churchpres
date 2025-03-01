import { useState, useEffect } from "react";
import { Fullscreen } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import LiveContent from "../components/LiveContent";

import "./Live.css"

function LiveView() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.title = "LIVE | ChurchPres";
  }, []);

  const handleClose = () => setShow(false);

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // Internet Explorer
      element.msRequestFullscreen();
    } else {
      alert("Fullscreen not supported.");
      return;
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to the Live View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Move this window to your external display then press the button below to go fullscreen.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFullscreen}>
            <Fullscreen /> Fullscreen
          </Button>
        </Modal.Footer>
      </Modal>
      <LiveContent />
    </>
  );
}

export default LiveView;
