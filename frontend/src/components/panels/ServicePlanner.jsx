import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";  // For reordering
import Song from "../libraries/songs/Song";  // Importing Song component

const ServicePlanner = ({ serviceItems, setServiceItems }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeIndex = serviceItems.findIndex(
      (item) => item.id === active.id
    );
    const overIndex = serviceItems.findIndex((item) => item.id === over.id);

    // Reorder the items in the array
    if (activeIndex !== overIndex) {
      const newItems = arrayMove(serviceItems, activeIndex, overIndex);
      setServiceItems(newItems);  // Update the serviceItems state
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h2>Service Planner</h2>
        {serviceItems.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </DndContext>
  );
};

const SongItem = ({ song }) => {
  const { setNodeRef } = useDroppable({
    id: song.id,
  });
  const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({
    id: song.id,
  });

  return (
    <div ref={setDraggableRef} {...listeners} {...attributes} style={{ marginBottom: "8px", cursor: "move" }}>
      <div ref={setNodeRef}>
        <Song song={song} />
        <button onClick={() => handleDelete(song.id)}>Delete</button>
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  // You would handle delete here, likely with a parent state update
  alert(`Deleted song with ID: ${id}`);
};

export default ServicePlanner;
