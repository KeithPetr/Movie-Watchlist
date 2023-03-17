const apiKey = "33db42b7";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");
const movieResultsEl = document.getElementById("movie-results");
const imagePlaceholder = document.getElementById("film-image");
const textPlaceholder = document.getElementById("start-exploring");
const myWatchlist = JSON.parse(localStorage.getItem("watchlist"));

let titleArray = [];
let movieDataArray = [];
let watchlistArray = JSON.parse(localStorage.getItem("watchlist")) || [];

// --------------------- Functions -----------------------------

function search() {
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      getTitlesArray(data.Search);
      getMovieHtml(titleArray);
    });
}

function getTitlesArray(data) {
  for (let movie of data) {
    titleArray.push(movie.Title);
  }
}

function getMovieHtml() {
  movieResultsEl.innerHTML = "";
  for (let title of titleArray) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
      .then((res) => res.json())
      .then((data) => {
        movieDataArray.push(data);
        movieResultsEl.innerHTML += `<div class="movie-container">
            <img class="movie-poster" src='${
              data.Poster
            }' alt="movie poster for ${data.Title}">
            <div class="movie-info">
                <div class="title-rating">
                    <h3 class="title">${data.Title}</h3>
                    <p class="rating">⭐ ${data.imdbRating}</p>
                </div>
                <div class="time-genre-watchlist">
                    <p class="time">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <p id="add-to-list" class="watchlist" data-index="${movieDataArray.indexOf(
                      data
                    )}">➕ Add to Watchlist</p>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>`;
      });
  }
}

movieResultsEl.addEventListener("click", (e) => {
    if (e.target && e.target.id === "add-to-list") {
      const index = e.target.dataset.index;
      const movie = movieDataArray[index];
      watchlistArray.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
    }
});

// ------------------------ Event Listeners --------------------
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});
