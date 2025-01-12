const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Stock data (this can be replaced with a database in a real-world scenario)
let stockData = [];

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Get stock data
app.get('/api/stock', (req, res) => {
    res.json(stockData);
});

// Add new stock item
app.post('/api/stock', (req, res) => {
    const { item, size, quantity } = req.body;
    stockData.push({ item, size, quantity });
    res.status(201).json({ message: 'Stock added successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
