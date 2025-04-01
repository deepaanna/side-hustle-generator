document.getElementById('packing-list-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const length = parseInt(this.length.value);
    const weather = this.weather.value;
    const type = this.type.value;
    const gender = this.gender.value;

    // Base items (always included)
    const base = {
        essentials: ['Passport/ID', 'Wallet/Cash/Cards', 'Phone + Charger'],
        toiletries: ['Toothbrush', 'Toothpaste', 'Deodorant', 'Shampoo (travel size)']
    };

    // Weather-specific clothing
    const clothing = {
        warm: {
            unisex: ['3 T-shirts', '2 Shorts', 'Sandals', 'Sunglasses'],
            male: ['3 T-shirts', '2 Shorts', 'Sandals', 'Cap'],
            female: ['3 Tops', '2 Shorts/Skirts', 'Sandals', 'Sunglasses']
        },
        cold: {
            unisex: ['2 Sweaters', '1 Jacket', 'Boots', 'Scarf'],
            male: ['2 Sweaters', '1 Jacket', 'Boots', 'Beanie'],
            female: ['2 Sweaters', '1 Coat', 'Boots', 'Scarf']
        },
        mixed: {
            unisex: ['2 T-shirts', '1 Sweater', '1 Jacket', 'Sneakers'],
            male: ['2 T-shirts', '1 Sweater', '1 Jacket', 'Sneakers'],
            female: ['2 Tops', '1 Sweater', '1 Jacket', 'Sneakers']
        }
    };

    // Trip-type extras
    const extras = {
        vacation: ['Swimsuit', 'Book/E-reader', 'Sunscreen'],
        business: ['Laptop + Charger', 'Notebook/Pen', 'Dress Shoes'],
        adventure: ['Water Bottle', 'Hiking Shoes', 'First Aid Kit']
    };

    // Length adjustments
    const lengthExtras = {
        7: ['Extra Socks', '1 Pants'],
        14: ['Extra Socks', '2 Pants', 'Laundry Kit'],
        30: ['Extra Socks', '3 Pants', 'Laundry Kit', 'Travel Towel']
    };

    // Build the list
    let packingList = {
        essentials: [...base.essentials],
        toiletries: [...base.toiletries],
        clothing: [...clothing[weather][gender]],
        extras: [...extras[type]]
    };

    if (length >= 7) {
        packingList.clothing.push(...lengthExtras[7]);
    }
    if (length >= 14) {
        packingList.clothing.push(...lengthExtras[14].slice(2)); // Avoid duplicates
    }
    if (length >= 30) {
        packingList.clothing.push(...lengthExtras[30].slice(2));
    }

    // Travel tips
    const tips = [
        'Roll clothes to save space and reduce wrinkles.',
        'Wear your bulkiest items (jacket, boots) on travel day.',
        'Pack multi-use items—like a sarong or scarf.',
        'Use packing cubes or bags for organization.',
        'Check airline weight limits to avoid fees.'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Output with save feature
    const output = `
        <h3>Your Minimalist Packing List</h3>
        <h4>Essentials</h4><ul>${packingList.essentials.map(item => `<li>${item}</li>`).join('')}</ul>
        <h4>Toiletries</h4><ul>${packingList.toiletries.map(item => `<li>${item}</li>`).join('')}</ul>
        <h4>Clothing</h4><ul>${packingList.clothing.map(item => `<li>${item}</li>`).join('')}</ul>
        <h4>Extras</h4><ul>${packingList.extras.map(item => `<li>${item}</li>`).join('')}</ul>
        <p><strong>Travel Tip:</strong> ${randomTip}</p>
        <p><em>For a ${length}-day ${type} trip in ${weather} weather!</em></p>
        <button onclick="savePackingList()">Save List</button>
        <div id="saved-list"></div>
    `;

    document.getElementById('packing-list-result').innerHTML = output;
});

// Save packing list to local storage
function savePackingList() {
    const result = document.getElementById('packing-list-result').innerHTML;
    localStorage.setItem('savedPackingList', result);
    displaySavedList();
}

// Display saved list
function displaySavedList() {
    const saved = localStorage.getItem('savedPackingList');
    document.getElementById('saved-list').innerHTML = saved ? `<h4>Saved List:</h4>${saved}` : '';
}

// Load saved list on page load
window.onload = displaySavedList;