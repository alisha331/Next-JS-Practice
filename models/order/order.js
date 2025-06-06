const express = require('express');
const connectDB = require('../db');
const Order = require('./orderSchema');
const app = express();

app.use(express.json());

connectDB(); // DB connection

// Create Order API
app.post('/order', async (req, res) => {
  const { customerID, bookID, initialDate, deliveryDate } = req.body;

  if (customerID && bookID && initialDate && deliveryDate) {
    const order = new Order({ customerID, bookID, initialDate, deliveryDate });
    await order.save();
    res.status(201).json(order);
  } else {
    res.status(400).json({ error: 'All fields are required' });
  }
});

// Get all orders API
app.get('/order', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Get order by ID API
app.get('/order/:id', async (req, res) => {
    const id = req.params.id;

    const order = await Order.findById(id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

// Delete order by ID API
app.delete('/order/:id', async (req, res) => {
    const id = req.params.id;

    const order = await Order.findByIdAndDelete(id);
    if (order) {
      res.json({ message: 'Order deleted' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Order service running at http://localhost:${PORT}`);
});
