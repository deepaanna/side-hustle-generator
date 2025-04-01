document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tax-form');
    if (!form) {
        console.error('Form with ID "tax-form" not found');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted');
        const country = this.country.value;
        const status = this.status.value;
        const totalIncome = parseFloat(this.income.value) || 0;
        const selfIncome = parseFloat(this.selfIncome.value) || 0;
        const gainsIncome = parseFloat(this.gainsIncome.value) || 0;
        const dependents = parseInt(this.dependents.value) || 0;
        const region = this.region.value.toUpperCase();
        const isSelfEmployed = this.isSelfEmployed.checked;

        const loadingElement = document.getElementById('loading');
        const resultElement = document.getElementById('result-content'); // Update to new ID
        if (!resultElement) {
            console.error('Result element with ID "result-content" not found');
            return;
        }
        if (loadingElement) {
            loadingElement.style.display = 'block';
        } else {
            console.warn('Loading element with ID "loading" not found');
        }
        resultElement.innerHTML = '';

        try {
            const now = Date.now();
            if (!cacheTime || now - cacheTime > 86400000 || !cachedTaxData[country]) {
                const newData = await fetchAndCacheTaxData();
                if (!newData) throw new Error('Tax data fetch failed');
            }

            const taxInfo = cachedTaxData[country];
            if (!taxInfo || !taxInfo.single) throw new Error('Invalid tax data for country');

            const brackets = taxInfo[status] || taxInfo.single;
            const deduction = taxInfo.standardDeduction || 0;
            const childCredit = (taxInfo.childCredit || 0) * Math.min(dependents, taxInfo.maxChildren || 10);
            const wageIncome = Math.max(0, totalIncome - selfIncome - gainsIncome);
            let taxableIncome = Math.max(0, wageIncome - deduction);
            let federalTax = 0;

            for (const bracket of brackets) {
                if (taxableIncome > bracket.min) {
                    const taxableInBracket = Math.min(taxableIncome, bracket.max === Infinity ? taxableIncome : bracket.max) - bracket.min;
                    federalTax += taxableInBracket * bracket.rate + (bracket.base || 0);
                } else {
                    break;
                }
            }

            let selfTax = 0;
            if (isSelfEmployed && taxInfo.selfEmploymentTax) {
                selfTax = selfIncome * taxInfo.selfEmploymentTax;
            }

            let gainsTax = 0;
            if (taxInfo.capitalGains) {
                const gainsBrackets = Array.isArray(taxInfo.capitalGains) ? taxInfo.capitalGains : [{ min: 0, max: Infinity, rate: taxInfo.capitalGains.rate || 0 }];
                for (const bracket of gainsBrackets) {
                    if (gainsIncome > bracket.min) {
                        const taxableInBracket = Math.min(gainsIncome, bracket.max === Infinity ? gainsIncome : bracket.max) - bracket.min;
                        gainsTax += taxableInBracket * bracket.rate + (bracket.base || 0);
                    } else {
                        break;
                    }
                }
            }

            let totalTax = federalTax + selfTax + gainsTax - childCredit;
            let regionTax = 0;
            if (taxInfo.stateTaxes && taxInfo.stateTaxes[region]) {
                const state = taxInfo.stateTaxes[region];
                regionTax = Math.min(totalIncome, state.maxIncome || Infinity) * state.rate;
                totalTax += regionTax;
            }

            resultElement.innerHTML = `
                <h3>Your Estimated Tax:</h3>
                <p><strong>${taxInfo.currency}${totalTax.toFixed(2)}</strong></p>
                <p><em>Wage Tax: ${taxInfo.currency}${federalTax.toFixed(2)}</em></p>
                <p><em>Self-Employment Tax: ${taxInfo.currency}${selfTax.toFixed(2)}</em></p>
                <p><em>Capital Gains Tax: ${taxInfo.currency}${gainsTax.toFixed(2)}</em></p>
                ${regionTax ? `<p><em>${region} Tax: ${taxInfo.currency}${regionTax.toFixed(2)}</em></p>` : ''}
                <p><em>Based on ${totalIncome.toLocaleString()} ${taxInfo.currency} (${wageIncome} wages, ${selfIncome} self-employed, ${gainsIncome} gains, ${dependents} dependents)</em></p>
            `;
        } catch (error) {
            resultElement.innerHTML = `<p>Error calculating tax: ${error.message}. Check console for details.</p>`;
            console.error(error);
        } finally {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }
    });
});

let cachedTaxData = JSON.parse(localStorage.getItem('taxData')) || {};
let cacheTime = localStorage.getItem('cacheTime');

async function fetchAndCacheTaxData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/deepaanna/tax-rates-data/main/tax-rates.json');
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const data = await response.json();
        cachedTaxData = data;
        const now = Date.now();
        localStorage.setItem('taxData', JSON.stringify(cachedTaxData));
        localStorage.setItem('cacheTime', now);
        cacheTime = now;
        return cachedTaxData;
    } catch (error) {
        console.error('Error fetching tax data:', error);
        return cachedTaxData && Object.keys(cachedTaxData).length > 0 ? cachedTaxData : null;
    }
}

window.onload = async () => {
    if (!cacheTime || Date.now() - cacheTime > 86400000) {
        await fetchAndCacheTaxData();
    }
};