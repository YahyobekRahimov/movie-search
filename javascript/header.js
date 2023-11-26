import { movieGenres } from "./constants.js";
import { fetchMovies } from "./functions.js";
const baseImgUrl = `https://image.tmdb.org/t/p/w300/`;

const GENRES_LIST = document.querySelector('.genres-list');
let fakeDom = '';
movieGenres.forEach(genre => {
  let listItem = `<li id='${genre.id}'>${genre.name}</li>`
  fakeDom += listItem;
});

GENRES_LIST.innerHTML = fakeDom;

GENRES_LIST.addEventListener('click', function(event) {
  const genreId = event.target.id;
  if (!genreId) {
    return;
  }

  window.location.href = `./genre.html?id=${genreId}`;
})

const SEARCH_INPUT = document.getElementById('search');

const wrapper = document.querySelector('.list-of-movies-searched');
SEARCH_INPUT.addEventListener('input', async function()  {
  if (this.value.length < 3) {
    wrapper.innerHTML = '';
    return;
  }
  const url = `https://api.themoviedb.org/3/search/movie?query=${this.value}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
    }
  }
  const movies = await fetchMovies(url, options);
  let fakeDom = '';
  localStorage.setItem('movieFromSearch', JSON.stringify(movies))
  for (let i = 0; i < 5; i++) {
    const movie = movies.results[i];
    let listItem = `
    <li class='special-class' id='${movie.id}'>
      <img width='50' src='${baseImgUrl}${movie.poster_path}' alt='not available'>
      <span class='movie-title'>${movie.original_title}</span> 
      <span class='movie-title'>${movie.release_date}</span> 
      <span class='movie-title'><img src="./images/star.svg" alt="star">${Math.round(movie.vote_average)}</span> 
    </li>`
    fakeDom += listItem;
  }
  wrapper.innerHTML = fakeDom;
})
