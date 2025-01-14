// Function to add stock item (for update-stock.html)
document.getElementById('addStockButton').addEventListener('click', function() {
    const item = document.getElementById('item').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    if (item && size && quantity) {
        // Create new stock data object
        const stockData = {
            item: item,
            size: size,
            quantity: parseInt(quantity, 10)
        };

        // Send POST request to the server to add stock
        fetch('/api/stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stockData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Clear form fields
            document.getElementById('item').value = '';
            document.getElementById('size').value = '';
            document.getElementById('quantity').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add stock.');
        });
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to check stock availability (for check-stock.html)
document.getElementById('checkStockButton').addEventListener('click', function() {
    const item = document.getElementById('item').value.trim();
    const size = document.getElementById('size').value.trim();
    const resultDiv = document.getElementById('stockResult');

    if (!item || !size) {
        resultDiv.innerHTML = '<p>Please enter both item and size to check stock.</p>';
        return;
    }

    // Fetch stock data from the server
    fetch('/api/stock')
        .then(response => response.json())
        .then(stockData => {
            const foundStock = stockData.find(stock => stock.item.toLowerCase() === item.toLowerCase() && stock.size.toLowerCase() === size.toLowerCase());
            
            // Display stock result
            if (foundStock) {
                resultDiv.innerHTML = `<p>The item "${item}" in size "${size}" is available with ${foundStock.quantity} units in stock.</p>`;
            } else {
                resultDiv.innerHTML = `<p>The item "${item}" in size "${size}" is not available in stock.</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = '<p>Error fetching stock data. Please try again later.</p>';
        });
});
