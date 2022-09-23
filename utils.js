
function getFilmHtml(film) {
    const { Poster, Title, Runtime, Genre, imdbRating, Plot, imdbID } = film
    return `
    <div class="film-container">
        <div class="result-film">
            <img class="film-img" src=${Poster}>
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

export { getFilmHtml, manageWatchlist }