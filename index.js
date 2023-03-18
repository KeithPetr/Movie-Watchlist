const apiKey = "33db42b7";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");
const movieResultsEl = document.getElementById("movie-results");
const imagePlaceholder = document.getElementById("film-image");
const textPlaceholder = document.getElementById("start-exploring");
const myWatchlist = JSON.parse(localStorage.getItem("watchlist"));

let titleArray = [];
let movieDataArray = [];
let renderedMovies = [];
let watchlistArray = JSON.parse(localStorage.getItem("watchlist")) || [];

// --------------------- Functions -----------------------------
// this function gets 10 results from the api based on the search term
function search() {
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      getTitlesArray(data.Search);
      console.log(data.Search);
      getMovieHtml(titleArray);
    });
}

// this function takes the array of movie titles returned by the
// search() function and pushes the titles to a new array
function getTitlesArray(data) {
  titleArray = [];
  for (let movie of data) {
    titleArray.push(movie.Title);
  }
}

// this function takes the titleArray, loops through them while
// calling the api using each title, and returns the information
// needed to populate the index.html page. The movie data is
// stored in another array so it can be used to add to the watchlist
// html page.
function getMovieHtml() {
  movieResultsEl.innerHTML = "";
  for (let title of titleArray) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
      .then((res) => res.json())
      .then((data) => {
        // check if the movie has already been rendered
        if (!renderedMovies.includes(data.Title)) {
          // add the movie to the renderedMovies array
          renderedMovies.push(data.Title);

          // render the movie
          movieDataArray.push(data);
          // check if a movie you are searching for is already
          // in the watchlist.
          const isInWatchlist = watchlistArray.some(
            (movie) => movie.Title === data.Title
          );
          const watchlistText = isInWatchlist
            ? "✔️ Added to Watchlist"
            : "➕ Add to Watchlist";

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
                    )}">${watchlistText}</p>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>`;
        }
      });
  }
}

// this function takes the stored movie data and saves it to local
// storage so it can be used to populate the html on the
// watchlist.html page. If the movie has already been added to the
// watchlist, an alert will pop up.
movieResultsEl.addEventListener("click", (e) => {
  if (e.target && e.target.id === "add-to-list") {
    const index = e.target.dataset.index;
    const movie = movieDataArray[index];
    if (watchlistArray.some((item) => item.imdbID === movie.imdbID)) {
      alert("This movie is already in your watchlist!");
      return;
    }
    watchlistArray.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
  }
  if (e.target.classList.contains("watchlist")) {
    e.target.textContent = "✔️ Added to Watchlist";
  }
});

// ------------------------ Event Listeners --------------------
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});
