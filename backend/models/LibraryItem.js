const mongoose = require('mongoose');
const { Schema } = mongoose;

const SlideSchema = new Schema({
  id: { type: String, required: true },         // e.g., "V1", "C", or "slide1"
  label: { type: String },                      // e.g., "Verse 1", "Chorus"
  variant: { type: String, default: "default" },
  lyrics: { type: String },                     // For songs
  mediaType: { type: String, enum: ["text", "image", "video", "ppt"], required: true },
  src: { type: String },                        // File path for media slides
}, { _id: false });

const LibraryItemSchema = new Schema({
  type: { type: String, enum: ["song", "image", "video", "ppt"], required: true },
  name: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  metadata: {
    authorship: {
      composer: { type: String },
      lyricist: { type: String }
    },
    duration: Number,
    fileSize: Number,
    filePath: String
  },

  slides: [SlideSchema]
});

module.exports = mongoose.model('LibraryItem', LibraryItemSchema);
