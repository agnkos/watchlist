
// http://www.omdbapi.com/

import { manageWatchlist, getFilmHtml, manageIcons } from './utils.js'

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const mainContent = document.getElementsByClassName('main-content')[0]
const dataPlaceholder = document.getElementsByClassName('data-placeholder')[0]



searchBtn.addEventListener('click', searchFilms)
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchFilms()
    }
})


function searchFilms() {
    fetch(`https://www.omdbapi.com/?apikey=9ac12ad4&s=${searchInput.value}&plot=short&r=json`)
        .then(res => res.json())
        .then(data => {
            const resultsArray = data.Search
            if (resultsArray === undefined) {
                dataPlaceholder.innerHTML = `
                <p>Unable to find what you're looking for. Please try another search.</p>
            `} else {
                mainContent.innerHTML = ''
                resultsArray.map(
                    film => fetch(`https://www.omdbapi.com/?apikey=9ac12ad4&i=${film.imdbID}&plot=short&r=json`)
                        .then(res => res.json())
                        .then(data => {
                            const html = getFilmHtml(data)
                            mainContent.innerHTML += html
                            manageIcons(film.imdbID)
                        }
                        )
                        .then(() => {
                            Array.from(document.querySelectorAll('.manage')).forEach(el => {
                                el.addEventListener('click', () =>
                                    manageWatchlist(el.id)
                                )
                            }
                            )
                        })
                )
            }
        })
}




