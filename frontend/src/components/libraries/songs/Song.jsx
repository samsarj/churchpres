import { useDraggable } from "@dnd-kit/core";

const Song = ({ song, isDragging }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: song.id,
    data: { type: "song", song },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        padding: "8px",
        margin: "4px",
        border: "1px solid #ccc",
        background: isDragging ? "lightgray" : "#fff",
        cursor: "grab",
        position: isDragging ? "absolute" : "relative",
        zIndex: isDragging ? 1000 : "auto",
        opacity: isDragging ? 0.7 : 1,  // Reduce opacity during drag
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.3)" : "none",  // Add shadow during drag
      }}
    >
      🎵 {song.title}
    </div>
  );
};

export default Song;
