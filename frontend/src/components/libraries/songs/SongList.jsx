import { useContext } from "react";
import { DisplayItemContext } from "../../../contexts/DisplayItemContext";  // Corrected import path
import Song from "./Song"; // Importing Song component
import ListGroup from "react-bootstrap/ListGroup";

import songs from './songs.json';

function SongList() {
  const { previewedItem, setPreviewedItem } = useContext(DisplayItemContext); // Using context

  return (
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <ListGroup
        variant="flush"
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        {songs.map((song, index) => {
          return (
            <ListGroup.Item
              action
              key={index}
              active={previewedItem && previewedItem.id === song.id}
              onClick={() => setPreviewedItem(song)}
              // className="d-flex align-items-center p-0"
            >
              {song.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default SongList;
