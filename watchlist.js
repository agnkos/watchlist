import { getFilmHtml, manageWatchlist } from "./utils.js"

const myWatchlistLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))
const watchlist = document.getElementById('watchlist')


window.onload = function watchlistHtml() {
    console.log(myWatchlistLocalStorage)
    if (myWatchlistLocalStorage.length > 0) {
        watchlist.innerHTML = ''
        myWatchlistLocalStorage.map(filmId => {
            fetch(`http://www.omdbapi.com/?apikey=9ac12ad4&i=${filmId}&plot=short&r=json`)
                .then(res => res.json())
                .then(data => {
                    const watchlistHtmlEl = getFilmHtml(data)
                    watchlist.innerHTML += watchlistHtmlEl
                })
                .then(() => {
                    Array.from(document.querySelectorAll('.manage')).forEach(el => {
                        console.log(el.id)
                        el.addEventListener('click', () =>
                            manageWatchlist(el.id)
                        )
                    }
                    )
                })
        })
    }
}

