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
                <th>.</th>
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
                <td><img src="${crypto.image}" alt=""></td>
                <td>${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>${crypto.current_price}</td>
                <td>${crypto.market_cap}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        console.log(tbody);

        // Append table to the container
        cryptoList.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Failed to fetch cryptocurrency data';
    }
}

// Call the function to display data
displayCryptoData();


//Display Global Data
async function displayGlobalData() {
    try {
        const globalData = await fetchGlobalData();
        const globalDataContainer = document.getElementById('global-data-container');

        // Clear previous data
        globalDataContainer.innerHTML = '';

        // Display global data if it exists
        if (globalData && globalData.data && globalData.data.market_data) {
            const marketData = globalData.data.market_data;

            // Check if total_market_cap property exists before accessing it
            if (marketData.total_market_cap && marketData.total_market_cap.usd) {
                const marketCap = marketData.total_market_cap.usd;
                const marketCapElement = document.createElement('div');
                marketCapElement.textContent = `Total Market Cap (USD): ${marketCap}`;
                globalDataContainer.appendChild(marketCapElement);
            }

            // Check if total_volume property exists before accessing it
            if (marketData.total_volume && marketData.total_volume.usd) {
                const totalVolume = marketData.total_volume.usd;
                const totalVolumeElement = document.createElement('div');
                totalVolumeElement.textContent = `Total 24h Volume (USD): ${totalVolume}`;
                globalDataContainer.appendChild(totalVolumeElement);
            }

            // Check if market_cap_percentage property exists before accessing it
            if (marketData.market_cap_percentage && marketData.market_cap_percentage.btc) {
                const dominanceBTC = marketData.market_cap_percentage.btc;
                const dominanceBTCElement = document.createElement('div');
                dominanceBTCElement.textContent = `BTC Dominance: ${dominanceBTC}%`;
                globalDataContainer.appendChild(dominanceBTCElement);
            }
        } else {
            // Display an error message if global data is missing
            console.error('Error displaying global data: Global data is missing');
        }
    } catch (error) {
        console.error('Error displaying global data:', error);
    }
}

// Call the function to display global data
displayGlobalData();
