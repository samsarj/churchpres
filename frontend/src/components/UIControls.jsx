import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Display, Fullscreen, FullscreenExit } from "react-bootstrap-icons";

import { useState, useEffect } from "react";

const UIControls = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Not in fullscreen mode, so request fullscreen
      const element = document.documentElement; // This targets the <html> element

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
      }

      setIsFullscreen(true);
    } else {
      // Already in fullscreen mode, so exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // Internet Explorer
        document.msExitFullscreen();
      }

      setIsFullscreen(false);
    }
  };

  return (
    <ButtonGroup>
      <Button title="Open Live window" onClick={window.open("/live", "_blank", "width=800,height=450")}>
        <Display />
      </Button>
      <Button title="Toggle fullscreen UI" variant="primary" onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </Button>
    </ButtonGroup>
  );
};

export default UIControls;
