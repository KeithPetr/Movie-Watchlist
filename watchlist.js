const myWatchlist = JSON.parse(localStorage.getItem("watchlist"));
const watchlistResultsEl = document.getElementById("watchlist-results");
const removeBtn = document.getElementById("remove");

function addWatchlistHtml(watchlistArray) {
  watchlistResultsEl.innerHTML = "";
  if (watchlistArray.length === 0) {
    watchlistResultsEl.innerHTML = `
    <p id="empty-list-text" class="empty-list-text">
        Your watchlist is looking a little empty...
    </p>
    <p id="add-movies-text" class="add-movies-text">
        ➕ Let's add some movies!
    </p>
    `;
  } else {
    for (let data of watchlistArray) {
      watchlistResultsEl.innerHTML += `
                <div class="movie-container">
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
                            <p id="remove" class="remove" data-index="${watchlistArray.indexOf(
                              data
                            )}">➕ Remove from Watchlist</p>
                        </div>
                        <p class="plot">${data.Plot}</p>
                    </div>
                </div>`;
    }
  }
}

if (myWatchlist) {
  addWatchlistHtml(myWatchlist);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const indexOfItem = e.target.dataset.index;
    myWatchlist.splice(indexOfItem, 1);
    localStorage.setItem("watchlist", JSON.stringify(myWatchlist));
    addWatchlistHtml(myWatchlist);
    if (myWatchlist.length === 0) {
      watchlistResultsEl.innerHTML = `
            <p id="empty-list-text" class="empty-list-text">
                Your watchlist is looking a little empty...
            </p>
            <p id="add-movies-text" class="add-movies-text">
                ➕ Let's add some movies!
            </p>
            `;
    }
  }
});
