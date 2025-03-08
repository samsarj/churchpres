import { CardText, DisplayFill, XCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SlideController from "./SlideController";

const LiveControl = () => {
  const handleClear = () => {
    console.log("Clear Live window");
  };
  const handleBlank = () => {
    console.log("Blank Live window");
  };

  const handleCloseLivePages = () => {
    const channel = new BroadcastChannel("close_live_pages");
    channel.postMessage("close");
  };

  return (
    <div 
    style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ flex: 1, overflowY: "auto" }}>
        <SlideController />
      </div>
      <ButtonGroup
        size="sm"
        className="w-100"
        // style={{ position: "absolute", bottom: 0 }}
      >
        <Button variant="warning" title="Clear Live window text" onClick={handleClear} className="w-100">
          <CardText /> Clear
        </Button>
        <Button variant="dark" title="Blank Live window" onClick={handleBlank} className="w-100">
          <DisplayFill /> Blank
        </Button>
        <Button
          title="Close all Live pages"
          variant="danger"
          onClick={handleCloseLivePages}
          className="w-100"
        >
          <XCircle /> Close
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default LiveControl;
