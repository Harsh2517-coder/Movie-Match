document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    const resultsContainer = document.getElementById('results-container');
    const loader = document.getElementById('loader');
    const paginationContainer = document.getElementById('pagination-container');

    let currentPage = 1;
    let currentQuery = {};

    // --- Event Listener ---
    filterBtn.addEventListener('click', () => {
        currentPage = 1;
        currentQuery = getFilterValues();
        fetchAndDisplayMovies();
    });

    // --- Core Functions ---
    function getFilterValues() {
        return {
            genre: document.getElementById('genre').value,
            mood: document.getElementById('mood').value,
            sort_by: document.getElementById('sort-by').value,
        };
    }

    async function fetchAndDisplayMovies() {
        loader.style.display = 'block';
        resultsContainer.innerHTML = '';
        paginationContainer.innerHTML = '';
        
        const payload = { ...currentQuery, page: currentPage };

        try {
            const response = await fetch('/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            displayMovies(data.movies);
            setupPagination(data.total_pages, data.current_page);

        } catch (error) {
            resultsContainer.innerHTML = `<p class="error-text">Error: Could not fetch recommendations.</p>`;
        } finally {
            loader.style.display = 'none';
        }
    }

    function displayMovies(movies) {
        if (movies.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align:center;">No matching movies found.</p>';
            return;
        }

        movies.forEach(movie => {
            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
            
            const card = document.createElement('div');
            card.className = 'movie-card';
            // Link is removed as we no longer fetch the IMDb ID
            card.innerHTML = `
                <img src="${posterPath}" alt="${movie.title} Poster">
                <div class="overlay">
                    <h4>${movie.title}</h4>
                    <p><span class="rating-star">⭐</span> ${movie.vote_average.toFixed(1)} / 10</p>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    function setupPagination(totalPages, page) {
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        };
        
        let paginationHTML = '';
        const maxPagesToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (page > 1) {
            paginationHTML += `<button class="page-btn" data-page="${page - 1}">&laquo; Prev</button>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (page < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${page + 1}">Next &raquo;</button>`;
        }

        paginationContainer.innerHTML = paginationHTML;

        document.querySelectorAll('.page-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                currentPage = Number(e.target.dataset.page);
                fetchAndDisplayMovies();
                window.scrollTo(0, 0);
            });
        });
    }
    
    // Initial load
    filterBtn.click();
});