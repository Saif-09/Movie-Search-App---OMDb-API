

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//Loading Movie details using API
async function loadMovies(searchTerm) {
    const URL = `http://omdbapi.com/?s=${searchTerm}&page=1&apikey=9f0decb8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);
}

// Helps to search movies
function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();
    // console.log(searchTerm);
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }
    else {
        searchList.classList.add('hide-search-list');
    }

}

//Render Movie details
function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A") {
            moviePoster = movies[i].Poster;
        }
        else {
            moviePoster = "no-img.jpg";
        }
        movieListItem.innerHTML = `<div class="search-item-thumbnail">
        <img src="${moviePoster}" alt="">
        </div>
        <div class="search-item-info">
        <h3> ${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
        </div>`;
        searchList.appendChild(movieListItem);

    }
    loadMovieDetails();
}

//Load Movie Details by Fetching data from API
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        // console.log(movie);
        movie.addEventListener('click', async () =>{
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9f0decb8`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });

    });
}


