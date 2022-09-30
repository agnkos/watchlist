import { getFilmHtml, manageIcons, goToTopButton, myWatchlist } from "./utils.js"

const watchlist = document.getElementById('watchlist')

window.addEventListener('load', watchlistHtml)

function watchlistHtml() {
    if (myWatchlist.length) {
        watchlist.innerHTML = ''
        myWatchlist.map(filmId => {
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
    let index = myWatchlist.indexOf(id)
    myWatchlist.splice(index, 1)
    localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
    watchlistHtml()
}

window.onscroll = function (ev) {
    goToTopButton()
}