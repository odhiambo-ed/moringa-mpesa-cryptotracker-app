import 'bootstrap/dist/css/bootstrap.min.css';
import './style/crypto.css'
import { fetchCryptoData } from './api/coinGeckoAPI';
import { fetchGlobalData } from './api/globalData';

async function displayCryptoData() {
    try {
        const data = await fetchCryptoData();
        const cryptoList = document.getElementById('cryptocurrency-list');

        // Clear previous data
        cryptoList.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.classList.add('table', 'table-success', 'table-striped');

        // Create table head
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Current Price (USD)</th>
                <th>Market Cap (USD)</th>
            </tr>
        `;
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>${crypto.current_price}</td>
                <td>${crypto.market_cap}</td>
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

// Function to display global data
async function displayGlobalData() {
    try {
        const globalData = await fetchGlobalData();
        console.log(globalData)
        const globalDataContainer = document.getElementById('global-data-container');

        // Clear previous data
        globalDataContainer.innerHTML = '';

        // Display global data
        const marketData = globalData.data.market_data;
        const marketCap = marketData.total_market_cap.usd;
        const totalVolume = marketData.total_volume.usd;
        const dominanceBTC = marketData.market_cap_percentage.btc;

        const marketCapElement = document.createElement('div');
        marketCapElement.textContent = `Total Market Cap (USD): ${marketCap}`;
        globalDataContainer.appendChild(marketCapElement);

        const totalVolumeElement = document.createElement('div');
        totalVolumeElement.textContent = `Total 24h Volume (USD): ${totalVolume}`;
        globalDataContainer.appendChild(totalVolumeElement);

        const dominanceBTCElement = document.createElement('div');
        dominanceBTCElement.textContent = `BTC Dominance: ${dominanceBTC}%`;
        globalDataContainer.appendChild(dominanceBTCElement);
    } catch (error) {
        console.error('Error displaying global data:', error);
    }
}

// Call the function to display global data
displayGlobalData();
