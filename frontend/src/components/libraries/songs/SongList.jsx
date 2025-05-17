import { useEffect, useState } from "react";
import Song from "./Song";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useLibraryStore } from "../../../stores/libraryStore";
import { useGlobalStore } from "../../../stores/globalStore";
import { ChevronDoubleRight } from "react-bootstrap-icons";

function SongList() {
  const items = useLibraryStore((state) => state.items);
  const fetchItems = useLibraryStore((state) => state.fetchItems);

  const setPreviewItem = useGlobalStore((state) => state.setPreviewItem);
  const previewItem = useGlobalStore((state) => state.previewItem);
  const setLiveItem = useGlobalStore((state) => state.setLiveItem);
  const liveItem = useGlobalStore((state) => state.liveItem);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleInstantLiveClick = (song) => {
    setLiveItem(song);
  };

  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <ListGroup
        variant="flush"
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {items
          .filter((item) => item.type === "song")
          .map((song, index) => (
            <ListGroup.Item
              action
              key={song._id || song.id || index}
              active={previewItem && previewItem._id === song._id}
              onClick={() => setPreviewItem(song)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.8rem",
              }}
            >
              <span>{song.name}</span>
              {(hoveredIndex === index || (liveItem && song._id === liveItem._id)) && (
                <ChevronDoubleRight
                  color={liveItem && song._id === liveItem._id ? "red" : "grey"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInstantLiveClick(song);
                  }}
                />
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

export default SongList;
