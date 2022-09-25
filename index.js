
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
                // console.log(resultsArray)
                mainContent.innerHTML = ''
                resultsArray.map(
                    film => fetch(`https://www.omdbapi.com/?apikey=9ac12ad4&i=${film.imdbID}&plot=short&r=json`)
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            const html = getFilmHtml(data)
                            mainContent.innerHTML += html
                            console.log(film.imdbID)
                            manageIcons(film.imdbID)
                            // console.log(document.getElementById(film.imdbID))
                            // console.log(document.querySelectorAll('.icon'))
                        }
                        )
                        .then(() => {
                            Array.from(document.querySelectorAll('.manage')).forEach(el => {
                                console.log(el.id)
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




// if (myWatchlist.includes(film.imdbID)) {
//     document.getElementById(film.imdbID).classList.remove('add')
//     manageWatchlist(film.imdbID)
// }



// function getFilmHtml(film) {
//     const { Poster, Title, Runtime, Genre, imdbRating, Plot, imdbID } = film
//     return `
//     <div class="film-container">
//         <div class="result-film">
//             <img class="film-img" src=${Poster}>
//             <div class="film-info">
//                 <div class="film-title">
//                     <h3>${Title}</h3>
//                     <p class="flex-center">
//                         <img src="img/star.png" class="icon">
//                         <span>${imdbRating}</span>
//                     </p>
//                 </div>
//                 <div class="film-details">
//                     <p class="runtime">${Runtime}</p>
//                     <p>${Genre}</p>
//                     <p class="flex-center">
//                         <img src="img/add.png" class="icon add manage" id="${imdbID}">
//                         <span id="text-icon${imdbID}">Add</span>
//                     </p>
//                 </div>
//                 <p class="film-plot">${Plot}</p>
//             </div>
//         </div>
//     </div>
//     `
// }

// function manageWatchlist(id) {
//     if (document.getElementById(id).classList.contains('add')) {
//         myWatchlist.push(id)
//         localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
//         document.getElementById(id).src = "img/remove.png"
//         document.getElementById(`text-icon${id}`).innerHTML = 'Remove'
//         document.getElementById(id).classList.remove('add')
//     } else {
//         let index = myWatchlist.indexOf(id)
//         myWatchlist.splice(index, 1)
//         localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
//         document.getElementById(id).src = "img/add.png"
//         document.getElementById(`text-icon${id}`).innerHTML = 'Add'
//         document.getElementById(id).classList.add('add')
//     }
// }

// export { getFilmHtml, manageWatchlist }



