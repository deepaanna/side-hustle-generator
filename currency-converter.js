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
        return null; // Fallback to cached rates if available
    }
}

// Conversion logic
document.getElementById('currency-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const fromCurrency = this['from-currency'].value;
    const toCurrency = this['to-currency'].value;
    const amount = parseFloat(this.amount.value);
    let result = 0;
    let label = toCurrency === 'GBP' ? '£' : toCurrency === 'EUR' ? '€' : '$';

    // Show loading state
    document.getElementById('loading').style.display = 'block';
    document.getElementById('currency-result').innerHTML = '';

    try {
        const now = Date.now();
        // Check cache validity (1 hour = 3600000 ms)
        if (!cacheTime || now - cacheTime > 3600000 || !cachedRates[fromCurrency]) {
            const newRates = await fetchAndCacheRates();
            if (!newRates) throw new Error('Rate fetch failed');
        }

        // Use cached rates
        const rate = cachedRates[toCurrency] / cachedRates[fromCurrency];
        if (!rate) throw new Error('Currency not supported');
        result = amount * rate;

        document.getElementById('currency-result').innerHTML = `
            <h3>Converted Amount:</h3>
            <p><strong>${result.toFixed(2)} ${label}</strong></p>
            <p><em>From ${amount} ${fromCurrency} (Rate: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency})</em></p>
        `;
    } catch (error) {
        document.getElementById('currency-result').innerHTML = `<p>Error converting. Try again later.</p>`;
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