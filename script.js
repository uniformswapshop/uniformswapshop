// Function to add item to the update list and update the stock (for update-stock.html)
function addToUpdateList() {
    const item = document.getElementById('item').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    if (item && size && quantity) {
        // Get the current stock data from localStorage or create an empty array if none exists
        let stockData = JSON.parse(localStorage.getItem('stockData')) || [];

        // Add the new item to the stock data array
        stockData.push({ item, size, quantity });

        // Store the updated stock data back to localStorage
        localStorage.setItem('stockData', JSON.stringify(stockData));

        // Update the stock display on the same page
        const updateList = document.getElementById('updateList');
        const li = document.createElement('li');
        li.textContent = `Item: ${item}, Size: ${size}, Quantity: ${quantity}`;
        updateList.appendChild(li);

        // Clear the form inputs
        document.getElementById('item').value = '';
        document.getElementById('size').value = '';
        document.getElementById('quantity').value = '';
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to load stock data and populate the table (for stock-table.html)
function loadStockTable() {
    const stockTableBody = document.querySelector('#stockTable tbody');

    // Get the stock data from localStorage
    const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

    // Clear existing rows
    stockTableBody.innerHTML = '';

    // Loop through the stock data and create table rows
    stockData.forEach(stock => {
        const row = document.createElement('tr');
        
        const itemCell = document.createElement('td');
        itemCell.textContent = stock.item;
        row.appendChild(itemCell);

        const sizeCell = document.createElement('td');
        sizeCell.textContent = stock.size;
        row.appendChild(sizeCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = stock.quantity;
        row.appendChild(quantityCell);

        stockTableBody.appendChild(row);
    });
}

// Function to check stock availability (for check-stock.html)
function checkStock() {
    const item = document.getElementById('item').value;
    const size = document.getElementById('size').value;
    const resultDiv = document.getElementById('stockResult');

    // Get the stock data from localStorage
    const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

    // Clear previous result
    resultDiv.innerHTML = '';

    // Check if item and size are entered
    if (item && size) {
        // Find the stock item that matches both item and size
        const foundStock = stockData.find(stock => stock.item.toLowerCase() === item.toLowerCase() && stock.size.toLowerCase() === size.toLowerCase());

        if (foundStock) {
            // Display stock availability
            resultDiv.innerHTML = `<p>The item "${item}" in size "${size}" is available with ${foundStock.quantity} units in stock.</p>`;
        } else {
            // Display message if the item/size is not found
            resultDiv.innerHTML = `<p>The item "${item}" in size "${size}" is not available in stock.</p>`;
        }
    } else {
        resultDiv.innerHTML = '<p>Please enter both item and size to check stock.</p>';
    }
}

// Conditional logic to determine which functionality to execute based on the current page
window.onload = function() {
    // Check if we're on the update stock page
    if (document.getElementById('updateStockForm')) {
        // Attach the addToUpdateList function to the button click
        const updateButton = document.querySelector('button[type="button"]');
        updateButton.addEventListener('click', addToUpdateList);
    }

    // Check if we're on the stock table page
    if (document.getElementById('stockTable')) {
        loadStockTable(); // Load and display the stock table
    }

    // Check if we're on the check stock page
    if (document.getElementById('checkStockForm')) {
        const checkButton = document.querySelector('button[type="button"]');
        checkButton.addEventListener('click', checkStock); // Attach the checkStock function to the button click
    }
};
