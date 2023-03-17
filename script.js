const movieSearchBox = $('#movie-search-box');
const searchList = $('#search-list');
const resultGrid = $('#result-grid');

//Loading Movie details using API
async function loadMovies(searchTerm) {
    const URL = `http://omdbapi.com/?s=${searchTerm}&page=1&apikey=9f0decb8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") displayMovieList(data.Search);
}

// Helps to search movies
function findMovies() {
    let searchTerm = (movieSearchBox.val()).trim();
    if (searchTerm.length > 0) {
        searchList.removeClass('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.addClass('hide-search-list');
    }
}

//Render Movie details
function displayMovieList(movies) {
    searchList.html("");
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = $('<div></div>');
        movieListItem.attr('data-id', movies[i].imdbID);
        movieListItem.addClass('search-list-item');
        let moviePoster = (movies[i].Poster != "N/A") ? movies[i].Poster : "no-img.jpg";
        movieListItem.html(`<div class="search-item-thumbnail">
        <img src="${moviePoster}" alt="">
        </div>
        <div class="search-item-info">
        <h3> ${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
        </div>`);
        searchList.append(movieListItem);
    }
    loadMovieDetails();
}

//Load Movie Details by Fetching data from API
function loadMovieDetails() {
    const searchListMovies = searchList.find('.search-list-item');
    searchListMovies.each(function() {
        $(this).click(async function() {
            searchList.addClass('hide-search-list');
            movieSearchBox.val("");
            const result = await fetch(`https://www.omdbapi.com/?i=${$(this).data('id')}&apikey=9f0decb8`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultGrid.html(`<div class="movie-poster">
    <img src="${(details.Poster!="N/A")? details.Poster : "no-img" }" alt="movie poster">

    </div>
<div class="movie-info">
    <h3 class="movie-title">${details.Title}</h3>
    <ul class="movie-misc-info">
        <li class="year">Year: ${details.Year}</li>
        <li class="ratings">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre"><strong>Genre: </strong>${details.Genre}</p>
    <p class="writer"><strong>Writer: </strong>${details.Writer}</p>
    <p class="actors"><strong>Actors: </strong>${details.Actors}</p>
    <p class="plot"><strong>Plot: </strong>${details.Plot}</p>
    <p class="language"><strong>Language: </strong>${details.Language}</p>
    <p class="awards"><strong><i class = "fas fa-award"></i></strong> ${details.Awards}</p>
</div>`);
}

$(document).click(function(event) {
    if (event.target.className != "form-control") {
        searchList.addClass('hide-search-list');
    }
});




// var movie_poster = [];
//         function search(variable_from_html_search, i){
//         var url = 'http://www.omdbapi.com/?apikey=9f0decb&s=*'+variable_from_html_search+'*&page='+i;
//         fetch(url).then(function(resp){
//             return resp.json()
//         })
//         .then(function(data){
//             var num = data.Search.length; //to get the length of response, sometimes its less than 10
//             for(var j=0; j < num; j++){         
//             movie_poster.push(data.Search[j]);
//             }
//             return movie_poster;    
//         });
//         return movie_poster;
//     };

// //loop through search.
//     function movie_list(variable_from_html_search){
//         var variable_from_html_search = document.getElementById("search").value;

//         for(var i=0; i < 10; i++){
//             movie_poster = search(variable_from_html_search,i);
//         }
//  //movie_poster now has top 100 list and you can use it anywhere, remember to use JSON.stringify()

// // OMDB API URL
// const omdbUrl = "https://www.omdbapi.com/";

// // API Key
// const apiKey = "9f0decb8";

// // Top Rated Movies
// const topRatedMoviesUrl = `${omdbUrl}?apikey=${apiKey}&s=&type=movie&r=json&y=&plot=short&tomatoes=false&page=1&sort_by=imdb_rating`;

// // Get Top Rated Movies
// const getTopRatedMovies = async () => {
//     try {
//         const response = await fetch(topRatedMoviesUrl);
//         const data = await response.json();

//         if (data.Response === "True") {
//             const topRatedContainer = document.querySelector("#top-rated-container");

//             data.Search.forEach((movie) => {
//                 const topRatedItem = document.createElement("div");
//                 topRatedItem.classList.add("top-rated-item");

//                 const topRatedItemImage = document.createElement("img");
//                 topRatedItemImage.src = movie_poster === "N/A" ? "no-image.png" : movie_poster;
//                 topRatedItemImage.alt = movie.Title;

//                 const topRatedItemInfo = document.createElement("div");
//                 topRatedItemInfo.classList.add("top-rated-item-info");

//                 const topRatedItemTitle = document.createElement("h3");
//                 topRatedItemTitle.textContent = movie.Title;

//                 const topRatedItemYear = document.createElement("p");
//                 topRatedItemYear.textContent = movie.Year;

//                 topRatedItemInfo.appendChild(topRatedItemTitle);
//                 topRatedItemInfo.appendChild(topRatedItemYear);

//                 topRatedItem.appendChild(topRatedItemImage);
//                 topRatedItem.appendChild(topRatedItemInfo);

//                 topRatedContainer.appendChild(topRatedItem);
//             });
//         } else {
//             console.log(data.Error);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Call getTopRatedMovies function
// getTopRatedMovies();
    
