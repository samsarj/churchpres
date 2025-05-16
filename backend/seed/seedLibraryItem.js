const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const LibraryItem = require('../models/LibraryItem');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/churchpres';

async function importSongs() {
  // Read songs.json
  const songsPath = path.join(__dirname, '../../frontend/src/components/libraries/songs/songs.json');
  const songsData = JSON.parse(fs.readFileSync(songsPath, 'utf-8'));

  for (const song of songsData) {
    const libraryItem = new LibraryItem({
      type: 'song',
      name: song.name,
      tags: [], // Optionally map tags if available
      metadata: {
        authorship: song.authorship || {},
      },
      slides: (song.content || []).map(slide => ({
        id: slide.shorthand,
        label: slide.verse,
        variant: slide.variant || 'primary',
        lyrics: slide.lyrics,
        mediaType: 'text',
        // src is not needed for text slides
      })),
    });

    await libraryItem.save();
    console.log(`Saved: ${song.name}`);
  }
}

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await importSongs();
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  });
