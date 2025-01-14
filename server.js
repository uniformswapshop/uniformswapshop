const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Path to the stock data file (persistent storage)
const stockDataFilePath = path.join(__dirname, 'stockData.json');

// Middleware to read stock data from the file
const readStockData = () => {
    if (fs.existsSync(stockDataFilePath)) {
        const rawData = fs.readFileSync(stockDataFilePath);
        return JSON.parse(rawData);
    }
    return [];
};

// Middleware to write stock data to the file
const writeStockData = (data) => {
    fs.writeFileSync(stockDataFilePath, JSON.stringify(data, null, 2));
};

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Get stock data
app.get('/api/stock', (req, res) => {
    const stockData = readStockData();
    res.json(stockData);
});

// Add new stock item
app.post('/api/stock', (req, res) => {
    const { item, size, quantity } = req.body;
    if (!item || !size || !quantity) {
        return res.status(400).json({ message: 'Item, size, and quantity are required.' });
    }

    const stockData = readStockData();
    stockData.push({ item, size, quantity });
    writeStockData(stockData);

    res.status(201).json({ message: 'Stock added successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
