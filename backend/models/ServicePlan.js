const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceItemSchema = new Schema({
  title: { type: String, required: true },
  itemRef: { type: Schema.Types.ObjectId, ref: 'LibraryItem', required: true },
  itemType: { type: String, enum: ["song", "image", "video", "ppt"], required: true },
  customOrder: [String], // like ["C", "V2", "C"]
  notes: String
}, { _id: false });

const ServicePlanSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  items: [ServiceItemSchema],
  currentLiveIndex: { type: Number, default: -1 },
  currentSlide: { type: String, default: "" }
});

module.exports = mongoose.model('ServicePlan', ServicePlanSchema);
