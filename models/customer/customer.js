const express = require('express');
const connectDB = require('../db');
const Customer = require('./customerSchema');
const app = express();

app.use(express.json());

connectDB(); // DB connection

// Test
app.get('/', (req, res) => {
    res.status(201).send("API triggered");
});

// Create customer API
app.post('/customer', async (req, res) => {
    const { name, age, address } = req.body;
    const customer = new Customer({ name, age, address });
    await customer.save();
    res.status(201).json(customer);
});

// Get all customer API
app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
});

// Get cutomer by id API
app.get('/customer/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Customer service running on http://localhost:${PORT}`);
});
