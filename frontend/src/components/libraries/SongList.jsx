import React from "react";
import Song from "../Song";  // Importing Song component

function SongList() {

    const songs = [
    { id: 1, title: "Song 1" },
    { id: 2, title: "Song 2" },
    { id: 3, title: "Song 3" },
    ];

  return (
    <div>
      {songs.map((song) => (
        <Song key={song.id} song={song} />  // Use Song component to render each song
      ))}
    </div>
  );
};

export default SongList;
