import { getFilmHtml, manageWatchlist, manageIcons } from "./utils.js"

const myWatchlistLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))
const watchlist = document.getElementById('watchlist')


window.addEventListener('load', watchlistHtml)


function watchlistHtml() {
    if (myWatchlistLocalStorage.length) {
        watchlist.innerHTML = ''
        myWatchlistLocalStorage.map(filmId => {
            fetch(`https://www.omdbapi.com/?apikey=9ac12ad4&i=${filmId}&plot=short&r=json`)
                .then(res => res.json())
                .then(data => {
                    const watchlistHtmlEl = getFilmHtml(data)
                    watchlist.innerHTML += watchlistHtmlEl
                    manageIcons(filmId)
                })
                .then(() => {
                    Array.from(document.querySelectorAll('.manage')).forEach(el => {
                        el.addEventListener('click', () =>
                            removeFromWatchlist(el.id)
                        )
                    }
                    )
                })
        })
    } else {
        watchlist.innerHTML = `
        <div class="data-placeholder">
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html" class="link-placeholder">
                <img src="img/placeholder-add.png" alt="">
                 <p>Let's add some movies!</p>
            </a>
        </div>
        `
    }
}

function removeFromWatchlist(id) {
    let index = myWatchlistLocalStorage.indexOf(id)
    myWatchlistLocalStorage.splice(index, 1)
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlistLocalStorage))
    console.log(myWatchlistLocalStorage)
    watchlistHtml()
}