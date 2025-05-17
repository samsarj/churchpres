import React from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Song from "../libraries/songs/Song";
import { useServicePlanStore } from "../../stores/servicePlanStore";

const ServicePlanner = () => {
  const servicePlan = useServicePlanStore((state) => state.servicePlan);
  const reorderItems = useServicePlanStore((state) => state.reorderItems);
  const addItemToPlan = useServicePlanStore((state) => state.addItemToPlan);
  const setServicePlan = useServicePlanStore((state) => state.setServicePlan);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeIndex = servicePlan.findIndex((item) => item.id === active.id);
    const overIndex = servicePlan.findIndex((item) => item.id === over.id);
    if (activeIndex !== overIndex) {
      reorderItems(arrayMove(servicePlan, activeIndex, overIndex));
    }
  };

  const handleDelete = (id) => {
    setServicePlan(servicePlan.filter((item) => item.id !== id));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <h2>Service Planner</h2>
        {servicePlan.map((song) => (
          <SongItem key={song.id} song={song} onDelete={handleDelete} />
        ))}
      </div>
    </DndContext>
  );
};

const SongItem = ({ song, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: song.id });
  const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({ id: song.id });

  return (
    <div ref={setDraggableRef} {...listeners} {...attributes} style={{ marginBottom: "8px", cursor: "move" }}>
      <div ref={setNodeRef}>
        <Song song={song} />
        <button onClick={() => onDelete(song.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ServicePlanner;
