

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//Loading Movie details using API
async function loadMovies(searchTerm){
    const URL = `http://omdbapi.com/?s=${searchTerm}&page=1&apikey=9f0decb8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data);
    
}
loadMovies('Avengers');