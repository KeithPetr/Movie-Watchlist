const apiKey = "33db42b7";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");
const movieResultsEl = document.getElementById("movie-results")
const imagePlaceholder = document.getElementById("film-image")
const textPlaceholder = document.getElementById("start-exploring")

let titleArray = [];

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
  console.log(titleArray);
}

function getMovieHtml() {
  for (let title of titleArray) {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
      .then((res) => res.json())
      .then((data) => {
        imagePlaceholder.classList.add('none')
        textPlaceholder.classList.add('none')
        movieResultsEl.innerHTML += `<div class="movie-container">
            <img src='${data.Poster}' alt="movie poster for ${data.Title}">
            <div class="movie-info">
                <div class="title-rating">
                    <h3 class="title">${data.Title}</h3>
                    <p class="rating">Star ${data.imdbRating}</p>
                </div>
                <div class="time-genre-watchlist">
                    <p class="time">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <p id="add-to-list" class="watchlist">Plus</p>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>`;
      });
  }
}

// ------------------------ Event Listeners --------------------
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});
