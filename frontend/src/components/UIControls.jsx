import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Display, Fullscreen, FullscreenExit, Gear, Palette } from "react-bootstrap-icons";
import { useState } from "react";
import ThemeSettings from "./theme/ThemeSettings";

const UIControls = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

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

  function handleOpenSettings() {
    console.log("Opening settings");
  }

  function handleThemeSettings() {
    console.log("Opening theme settings");
    setShowThemeSettings(true);
  }

  return (
    <ButtonGroup>
      <Button title="Open Live window" onClick={handleOpenLive}>
        <Display />
      </Button>
      <Button title="Theme Settings" onClick={handleThemeSettings}>
        <Palette />
        <ThemeSettings show={showThemeSettings} setShow={setShowThemeSettings}/>
        </Button>
      <Button title="ChurchPres Settings" onClick={handleOpenSettings}>
        <Gear />
      </Button>
      <Button title="Toggle fullscreen UI" variant="primary" onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
      </Button>
    </ButtonGroup>
  );
};

export default UIControls;
