export async function fetchGlobalData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        if (!response.ok) {
            throw new Error('Failed to fetch global data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching global data:', error);
        throw error;
    }
}