const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsContainer.innerHTML = ''; 

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            if (query.includes('beach')) {
                results = data.beaches;
            } else if (query.includes('temple')) {
                results = data.temples;
            } else if (query.includes('country')) {
                data.countries.forEach(country => {
                    results = results.concat(country.cities);
                });
            }

            if (results && results.length > 0) {
                results.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('result-card');
                    card.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    `;
                    resultsContainer.appendChild(card);
                });
            } else {
                resultsContainer.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
});