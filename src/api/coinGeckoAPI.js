// coinGeckoApi.js
export async function fetchCryptoData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    try {
        const response = await fetch('https://pro-api.coingecko.com/api/v3/coins/markets', options);
        if (!response.ok) {
            throw new Error('Failed to fetch cryptocurrency data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error.message);
        throw error;
    }
}
