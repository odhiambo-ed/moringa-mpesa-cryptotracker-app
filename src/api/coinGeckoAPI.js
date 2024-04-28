// coinGeckoApi.js
export async function fetchCryptoData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false', options);
        if (!response.ok) {
            throw new Error('Failed to fetch cryptocurrency data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
        throw error;
    }
}
