function getFilmHtml(film) {
    const { Title, Runtime, Genre, imdbRating, Plot, imdbID } = film
    if (film.Poster === "N/A") {
        film.Poster = "./img/film.png"
    }
    return `
    <div class="film-container">
        <div class="result-film">
            <img class="film-img" src=${film.Poster}>
            <div class="film-info">
                <div class="film-title">
                    <h3>${Title}</h3> 
                    <p class="flex-center">
                        <img src="img/star.png" class="icon">
                        <span>${imdbRating}</span>
                    </p>
                </div>
                <div class="film-details">
                    <p class="runtime">${Runtime}</p>
                    <p>${Genre}</p>   
                    <p class="flex-center"> 
                        <img src="img/add.png" class="icon add manage" id="${imdbID}">
                        <span id="text-icon${imdbID}">Add</span>     
                    </p>      
                </div>
                <p class="film-plot">${Plot}</p>
            </div>
        </div>
    </div>
    `
}

let myWatchlist = JSON.parse(localStorage.getItem('myWatchlist')) || []

function manageIcons(id) {
    if (myWatchlist.includes(id)) {
        document.getElementById(id).src = "img/remove.png"
        document.getElementById(`text-icon${id}`).innerHTML = 'Remove'
        document.getElementById(id).classList.remove('add')
    }
}

function manageWatchlist(id) {

    if (document.getElementById(id).classList.contains('add')) {
        myWatchlist.push(id)
        localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
        document.getElementById(id).src = "img/remove.png"
        document.getElementById(`text-icon${id}`).innerHTML = 'Remove'
        document.getElementById(id).classList.remove('add')
    } else {
        let index = myWatchlist.indexOf(id)
        myWatchlist.splice(index, 1)
        localStorage.setItem('myWatchlist', JSON.stringify(myWatchlist))
        document.getElementById(id).src = "img/add.png"
        document.getElementById(`text-icon${id}`).innerHTML = 'Add'
        document.getElementById(id).classList.add('add')
    }
}

function goToTopButton() {
    const btnUp = document.getElementById('btn-up')
    if (window.scrollY >= 210) {
        btnUp.classList.add('visible')
        btnUp.addEventListener('click', function () {
            window.scrollTo({ top: 0, behaviour: 'smooth' })
        })
    }
    else {
        btnUp.classList.remove('visible')
    }
}

export { getFilmHtml, manageWatchlist, manageIcons, goToTopButton, myWatchlist }