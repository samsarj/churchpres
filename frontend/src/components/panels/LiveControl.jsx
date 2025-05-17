import { useState } from "react";
import { CardText, DisplayFill, XCircle } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SlideController from "../global/SlideController";
import { useGlobalStore } from "../../stores/globalStore";

const LiveControl = () => {
  // const { liveItem } = useContext(DisplayItemContext);

  const liveItem = useGlobalStore((state) => state.liveItem);
  const setLiveSlideIndex = useGlobalStore((state) => state.setLiveSlideIndex);

  const blank = useGlobalStore((state) => state.blank);
  const setBlank = useGlobalStore((state) => state.setBlank);

  const clear = useGlobalStore((state) => state.clear);
  const setClear = useGlobalStore((state) => state.setClear);

  const handleClear = () => {
    console.log("Clear Live window");
    setClear(!clear);
  };
  const handleBlank = () => {
    console.log("Blank Live window");
    setBlank(!blank);
  };

  const handleCloseLivePages = () => {
    const channel = new BroadcastChannel("close_live_pages");
    channel.postMessage("close");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <SlideController
          item={liveItem}
          setActiveSlideIndex={setLiveSlideIndex}
        />
      </div>
      <ButtonGroup
        size="sm"
        className="w-100"
        // style={{ position: "absolute", bottom: 0 }}
      >
        <Button
          variant="warning"
          title="Clear Live window text"
          onClick={handleClear}
          active={clear}
          className="w-100"
        >
          <CardText /> Clear
        </Button>
        <Button
          variant="dark"
          title="Blank Live window"
          onClick={handleBlank}
          active={blank}
          className="w-100"
        >
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
