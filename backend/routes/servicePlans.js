const express = require('express');
const router = express.Router();
const ServicePlan = require('../models/ServicePlan');

// GET all service plans
router.get('/', async (req, res) => {
  const plans = await ServicePlan.find().populate('items.itemId');
  res.json(plans);
});

// POST create a new service plan
router.post('/', async (req, res) => {
  const newPlan = new ServicePlan(req.body);
  await newPlan.save();
  res.status(201).json(newPlan);
});

// PUT update a service plan
router.put('/:id', async (req, res) => {
  const updated = await ServicePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
