const express = require('express');
const items = require('./fakeDb');


const router = express.Router(); // create a new router

// GET /items - Get all items
router.get('/', (req, res) => {
    res.json(items);
});

// POST /items - Create new item and add to items
router.post('/', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json({ added: newItem });
});

// GET /items/:name - Get item by name
router.get('/:name', (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// PATCH /items/:name - Update item by name
router.patch('/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex > -1) {
        const item = items[itemIndex];
        const updatedItem = { ...item, ...req.body };
        items[itemIndex] = updatedItem;
        res.json({ updated: updatedItem });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

// DELETE /items/:name - Delete item by name
router.delete('/:name', (req, res) => {
    const itemIndex = items.findIndex(i => i.name === req.params.name);
    if (itemIndex > -1) {
        items.splice(itemIndex, 1);
        res.json({ message: "Deleted" });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

module.exports = router;