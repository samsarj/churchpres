const LibraryItem = require('../models/LibraryItem');

// GET all items
exports.getAllItems = async (req, res) => {
  const items = await LibraryItem.find();
  res.json(items);
};

// GET item by ID
exports.getItem = async (req, res) => {
  const item = await LibraryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

// POST create new item
exports.createItem = async (req, res) => {
  const item = new LibraryItem(req.body);
  await item.save();
  res.status(201).json(item);
};

// PUT update item
exports.updateItem = async (req, res) => {
  const item = await LibraryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

// DELETE item
exports.deleteItem = async (req, res) => {
  const result = await LibraryItem.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Item not found' });
  res.json({ message: 'Item deleted' });
};

// PUT update slide order
exports.updateSlideOrder = async (req, res) => {
  const { libraryId, slideId, newOrder } = req.body;
  const item = await LibraryItem.findById(libraryId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const slide = item.slides.id(slideId);
  if (!slide) return res.status(404).json({ message: 'Slide not found' });
  slide.order = newOrder;
  await item.save();
  res.json(item);
}
