const apiKey = "33db42b7";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");



// --------------------- Functions -----------------------------

function search() {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
      .then((res) => res.json())
      .then((data) => {
        getTitlesArray(data.Search)
    });
  }

function getTitlesArray(data) {
    for (let movie of data) {
        console.log(movie.Title)
    }
}

function getMovieHtml(data) {
    return `
    <div class="movie-container">
        <img src='${data}' alt="movie poster for ${data}">
        <div class="movie-info">
            <div class="title-rating">
                <h3 class="title"></h3>
                <p class="rating">Star ${data}</p>
            </div>
            <div class="time-genre-watchlist">
                <p class="time">${data}</p>
                <p class="genre">${data}</p>
                <p id="add-to-list" class="watchlist">Plus ${data}</p>
            </div>
            <p class="plot">${data}</p>
        </div>
    </div>
    `
  }

// ------------------------ Event Listeners --------------------
searchBtn.addEventListener("click", search);
searchInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    search();
  }
});
