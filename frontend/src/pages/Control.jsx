import { useState, useEffect } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Container from "react-bootstrap/Container";
import { createPortal } from "react-dom"; // for rendering outside the main component tree
import LibraryManager from "../components/LibraryManager";
import ServicePlanner from "../components/ServicePlanner";
import Song from "../components/Song"; // Importing Song to show in overlay
import Header from "../components/Header";

function Control() {
  const [serviceItems, setServiceItems] = useState([]);
  const [activeSong, setActiveSong] = useState(null); // Track the song being dragged

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Header />
      <Container fluid style={{ height: "100vh", display: "flex" }}>
        <LibraryManager />
        <ServicePlanner serviceItems={serviceItems} />
      </Container>

      {/* Drag Overlay to show dragged item */}
      {activeSong &&
        createPortal(
          <DragOverlay>
            <Song song={activeSong} isDragging />
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}

export default Control;
