import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Container from "react-bootstrap/Container";
import { createPortal } from "react-dom";
import LibraryManager from "../../components/panels/LibraryManager";
import ServicePlanner from "../../components/panels/ServicePlanner";
import Song from "../../components/libraries/songs/Song";
import Header from "../../components/Header";
import LiveControl from "../../components/panels/LiveControl";
import PreviewControl from "../../components/panels/PreviewControl";
import Footer from "../../components/Footer";
import { useServicePlanStore } from "../../stores/servicePlanStore";
import PreviewWindow from "../../components/panels/PreviewWindow";
import LiveWindow from "../../components/panels/LiveWindow";

function Control() {
  const [activeSong, setActiveSong] = useState(null);
  const addItemToPlan = useServicePlanStore((state) => state.addItemToPlan);

  useEffect(() => {
    document.title = "CONTROL | ChurchPres";
  }, []);

  const handleDragStart = (event) => {
    const song = event.active.data.current?.song;
    setActiveSong(song);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveSong(null);

    if (!over) return;

    if (active.data.current?.type === "song") {
      const newSong = active.data.current.song;
      addItemToPlan(newSong);
    }
  };

  return (
    <>
      <Header />
      <PanelGroup direction="horizontal" style={{ height: "85vh" }}>
        <PanelGroup direction="vertical">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Panel>
              <LibraryManager />
            </Panel>
            <PanelResizeHandle />
            <Panel>
              <ServicePlanner />
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
            <PreviewControl />
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <PreviewWindow />
          </Panel>
        </PanelGroup>
        <PanelResizeHandle />
        <PanelGroup direction="vertical">
          <Panel style={{ position: "relative" }}>
            <LiveControl />
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <LiveWindow />
          </Panel>
        </PanelGroup>
      </PanelGroup>
      <Footer />
    </>
  );
}

export default Control;
