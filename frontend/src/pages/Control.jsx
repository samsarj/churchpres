import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Container from "react-bootstrap/Container";
import { createPortal } from "react-dom"; // for rendering outside the main component tree
import LibraryManager from "../components/LibraryManager";
import ServicePlanner from "../components/ServicePlanner";
import Song from "../components/Song"; // Importing Song to show in overlay
import Header from "../components/Header";
import LiveControl from "../components/LiveControl";
import PreviewControl from "../components/PreviewControl";
import Footer from "../components/Footer";

function Control() {
  const [serviceItems, setServiceItems] = useState([]);
  const [activeSong, setActiveSong] = useState(null); // Track the song being dragged

  const [previewedItem, setPreviewedItem] = useState(null);
  const [liveItem, setLiveItem] = useState(null);

  useEffect(() => {
    document.title = "CONTROL | ChurchPres";
  }, []);

  const handleDragStart = (event) => {
    const song = event.active.data.current?.song;
    setActiveSong(song); // Set the song that is being dragged
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveSong(null); // Reset active song after drag ends

    if (!over) return;

    if (active.data.current?.type === "song") {
      const newSong = active.data.current.song;
      setServiceItems((prev) => [...prev, newSong]); // Add song to ServicePlanner
    }
  };

  return (
    <>
      <Header />
      <PanelGroup direction="horizontal" style={{ height: "85vh" }}>
        <PanelGroup direction="vertical">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Panel>
              <LibraryManager
                setPreviewedItem={setPreviewedItem}
                previewedItem={previewedItem}
              />
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <ServicePlanner serviceItems={serviceItems} />
            </Panel>
            {activeSong &&
              createPortal(
                <DragOverlay>
                  <Song song={activeSong} isDragging />
                </DragOverlay>,
                document.body
              )}
          </DndContext>
        </PanelGroup>
        <PanelResizeHandle />
        <PanelGroup direction="vertical">
          <Panel>
            <PreviewControl previewedItem={previewedItem} />
          </Panel>
          <PanelResizeHandle />
          <Panel>Preview Window</Panel>
        </PanelGroup>
        <PanelResizeHandle />
        <PanelGroup direction="vertical">
          <Panel style={{ position: "relative" }}>
            <LiveControl liveItem={liveItem} />
          </Panel>
          <PanelResizeHandle />
          <Panel>Live Window</Panel>
        </PanelGroup>
      </PanelGroup>
      <Footer />
    </>
  );
}

export default Control;
