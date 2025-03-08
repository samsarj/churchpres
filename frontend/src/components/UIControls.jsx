import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Display, Fullscreen, FullscreenExit } from "react-bootstrap-icons";
import { useState } from "react";

const UIControls = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  function handleOpenLive() {
    window.open("/live", "_blank", "width=800,height=450");
  }

  return (
    <ButtonGroup>
      <Button title="Open Live window" onClick={handleOpenLive}>
        <Display />
      </Button>
      <Button title="Toggle fullscreen UI" variant="primary" onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </Button>
    </ButtonGroup>
  );
};

export default UIControls;
