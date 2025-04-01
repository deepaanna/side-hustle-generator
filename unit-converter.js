// Cache setup in global scope
let cachedRates = JSON.parse(localStorage.getItem('currencyRates')) || {};
let cacheTime = localStorage.getItem('cacheTime');
const apiKey = '9a4f7208b87462e98ca92d01'; // Replace with your ExchangeRate-API key

// Function to fetch and cache rates
async function fetchAndCacheRates() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        if (data.result === 'success') {
            cachedRates = data.conversion_rates;
            const now = Date.now();
            localStorage.setItem('currencyRates', JSON.stringify(cachedRates));
            localStorage.setItem('cacheTime', now);
            cacheTime = now;
            return cachedRates;
        } else {
            throw new Error('API error');
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
        return null; // Fallback to cached rates or static if available
    }
}

// Main conversion logic
document.getElementById('unit-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const value = parseFloat(this['unit-input'].value);
    const type = this['unit-type'].value;
    let result = 0;
    let label = '';

    // Show loading state
    document.getElementById('loading').style.display = 'block';
    document.getElementById('unit-result').innerHTML = '';

    try {
        if (type.startsWith('currency')) {
            const [_, from, to] = type.split('-'); // e.g., "currency-usd-gbp" -> usd, gbp
            const now = Date.now();

            // Check cache validity (1 hour = 3600000 ms)
            if (!cacheTime || now - cacheTime > 3600000 || !cachedRates[from.toUpperCase()]) {
                const newRates = await fetchAndCacheRates();
                if (!newRates) throw new Error('Rate fetch failed');
            }

            // Use cached rates
            const rate = cachedRates[to.toUpperCase()] / cachedRates[from.toUpperCase()];
            result = value * rate;
            label = to === 'gbp' ? '£' : '$'; // Adjust based on currency
        } else {
            // Non-currency conversions (static)
            switch (type) {
                case 'distance':
                    result = value * 1.60934;
                    label = 'km';
                    break;
                case 'weight':
                    result = value * 0.453592;
                    label = 'kg';
                    break;
                case 'energy':
                    result = value * 4.184;
                    label = 'kJ';
                    break;
            }
        }

        document.getElementById('unit-result').innerHTML = `
            <h3>Converted Value:</h3>
            <p><strong>${result.toFixed(2)} ${label}</strong></p>
            <p><em>From ${value} ${type.split('-')[0] === 'currency' ? from.toUpperCase() : 'original units'}</em></p>
        `;
    } catch (error) {
        document.getElementById('unit-result').innerHTML = `<p>Error converting. Try again later.</p>`;
        console.error(error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

// Initial fetch on page load (optional)
window.onload = async () => {
    if (!cacheTime || Date.now() - cacheTime > 3600000) {
        await fetchAndCacheRates();
    }
};