const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const modalClose = document.querySelector(".modal-close");
const modalTitle = document.getElementById("modal-title");
const modalOverview = document.getElementById("modal-overview");
const modalRelease = document.getElementById("modal-release");
const modalRating = document.getElementById("modal-rating");
const modalOverlay = document.querySelector(".modal-overlay");

const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");
const currentPage = document.getElementById("current-page");
const totalPages = document.getElementById("total-pages");


let currentPageNumber = 1;
let totalPageNumber = 1;
getMovies(API_URL);

function closeModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    main.classList.remove("blur");
}
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
        main.innerHTML = "No movies found.";
    } else {
        showMovies(data.results);
        totalPageNumber = data.total_pages;
        currentPage.textContent = currentPageNumber;
        totalPages.textContent = totalPageNumber;
    }
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${IMAGE_URL + poster_path}" alt="${title}">
            <div class="movie-details">
                <h2 class="movie-title">${title}</h2>
                <p class="movie-rating">Rating: ${vote_average}</p>
                <p class="movie-overview">${overview}</p>
            </div>
        `;
        movieCard.addEventListener("click", () => showMovieDetails(movie.id));
        main.appendChild(movieCard);
    });
}

search.addEventListener("input", () => {
    const searchTerm = search.value;
    if (searchTerm) {
        const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=9813ce01a72ca1bd2ae25f091898b1c7&query=${searchTerm}`;
        getMovies(searchURL);
    } else {
        getMovies(API_URL); 
    }
});


function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const { id, poster_path, title, original_language, popularity, vote_count } = movie;

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${IMAGE_URL + poster_path}" alt="${title}">
            <div class="movie-details">
                <h2 class="movie-title">${title}</h2>
                <p class="movie-language">Language: ${original_language}</p>
                <p class="movie-popularity">Popularity: ${popularity}</p>
                <p class="movie-vote-count">Votes: ${vote_count}</p>
            </div>
        `;

        movieCard.addEventListener("click", (event) => {
            event.stopPropagation();
            showMovieDetails(id);
        });

        main.appendChild(movieCard);
    });
}


modalClose.addEventListener("click", () => {
    closeModal();
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
    e.stopPropagation();
});




function showMovieDetails(movieId) {
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=9813ce01a72ca1bd2ae25f091898b1c7`;
    fetch(movieDetailsURL)
        .then(response => response.json())
        .then(data => {
            modalTitle.textContent = data.title;
            modalOverview.textContent = data.overview;
            modalRelease.textContent = `Release Date: ${data.release_date}`;
            modalRating.textContent = `Rating: ${data.vote_average}`;
            const movieImage = document.createElement("img");
            movieImage.src = IMAGE_URL + data.poster_path;
            movieImage.alt = data.title;

            const movieDetails = document.createElement("div");
            movieDetails.classList.add("movie-details-modal");
            movieDetails.appendChild(movieImage);

            const detailsContainer = document.createElement("div");
            detailsContainer.classList.add("details-container");
            detailsContainer.appendChild(modalTitle);
            detailsContainer.appendChild(modalOverview);
            detailsContainer.appendChild(modalRelease);
            detailsContainer.appendChild(modalRating);

            movieDetails.appendChild(detailsContainer);

            modal.innerHTML = "";
            modal.appendChild(movieDetails);
            main.classList.add("blur");
            modal.style.display = "flex";
            modalOverlay.style.display = "block";
            modalClose.addEventListener("click", () => {
                closeModal();
            });
            modalOverlay.addEventListener("click", (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

        })
}

nextPageBtn.addEventListener("click", () => {
    if (currentPageNumber < totalPageNumber) {
        currentPageNumber++;
        getMovies(`${API_URL}&page=${currentPageNumber}`);
        currentPage.textContent = currentPageNumber;
    }
});

prevPageBtn.addEventListener("click", () => {
    if (currentPageNumber > 1) {
        currentPageNumber--;
        getMovies(`${API_URL}&page=${currentPageNumber}`);
        currentPage.textContent = currentPageNumber;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    getMovies(API_URL);
});

modalClose.addEventListener("click", () => {
    closeModal();
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "none";
});
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});


