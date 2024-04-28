import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCryptoData } from './api/coinGeckoAPI';

async function displayCryptoData() {
    try {
        const data = await fetchCryptoData();
        const cryptoList = document.getElementById('cryptocurrency-list');

        // Clear previous data
        cryptoList.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.classList.add('table');

        // Create table head
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Current Price</th>
                <th>Symbol</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.current_price}</td>
                <td>${crypto.symbol}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Append table to the container
        cryptoList.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Failed to fetch cryptocurrency data';
    }
}

// Call the function to display data
displayCryptoData();
