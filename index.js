import { movieGenres, seriesGenres } from "./javascript/constants.js";
import { handleLoginSignupButton, fetchTopRatedMovies, getGenresNames, fetchMovies } from "./javascript/functions.js";

const SIGN_UP_LOGIN_BUTTON = document.querySelector('.sign-up-login');
const USER_PROFILE_BUTTON = document.querySelector('.user-button');
if (handleLoginSignupButton()) {
  SIGN_UP_LOGIN_BUTTON.style.display = 'none';
  USER_PROFILE_BUTTON.style.display = 'inline';
};

USER_PROFILE_BUTTON.addEventListener('click', () => {
  document.querySelector('.user-dropdown')
        .classList.toggle('display-flex');
})
document.querySelector('body').addEventListener('click', function(event) {
  let firstClass = event.target.classList[0];
  if (firstClass == 'user-dropdown' || firstClass == 'dropdown-profile' || firstClass == 'dropdown-favorites') {
    return;
  }
  if (firstClass == 'user-button' || firstClass == 'dropdown-logout') return;
  document.querySelector('.user-dropdown').classList.remove('display-flex');
}) 
const topRatedMovies = await fetchTopRatedMovies();

const urlPopular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const optionsPopular = {
method: 'GET',
headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
}};

const LOGOUT = document.querySelector('.dropdown-logout');
LOGOUT.addEventListener('click', function() {
  clearAllCookies();
  window.location.reload();
})
function clearAllCookies() {
  let cookies = document.cookie.split('; ');
  cookies.forEach(cookie => {
    cookie = cookie.trim();
    const equalsSignIndex = cookie.indexOf('=');
    const cookieName = equalsSignIndex > -1 ? cookie.substring(0, equalsSignIndex) : cookie;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;`;
  })
}

const popularMovies = await fetchMovies(urlPopular, optionsPopular);

const urlNewMovies = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const optionsNewMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
  }
};

const newReleaseMovies = await fetchMovies(urlNewMovies, optionsNewMovies);

const TRENDING_MOVIES_WRAPPER = document.querySelector('.trending__movies-wrapper');

const baseImgUrl = `https://image.tmdb.org/t/p/w300/`;

let fakeDom = '';
for (let i = 1; i <= 6; i++) {
    const element = topRatedMovies.results[i];
    const genresArr = element.genre_ids;
    const genreNames = getGenresNames(genresArr, movieGenres, seriesGenres);
    let listOfGenres = '';
    genreNames.forEach(genre => {
      listOfGenres += `<li>${genre}</li>`
    })
    let card = `
                <div class="trending__movie__block" id='${element.id}'>
                  <div class="trending__movie__img-wrapper">
                    <img width='352' height='293' class='movie-img' src="${baseImgUrl}${element.poster_path}" alt="" />
                    <div class="trending__movies-rating">
                      <img src="./images/star.svg" alt="star" />
                      ${(parseInt(element.vote_average)).toFixed(1)}
                    </div>
                    <img
                      class="img-play-bigger"
                      src="./images/play.svg"
                      alt="play"
                    />
                  </div>
                  <div class="trending__movie__description">
                    <h3 class="trending__movie__name">${element.original_title}</h3>
                    <ul class="trending__movie-categories">
                    ${listOfGenres}
                    </ul>
                  </div>
                </div>
                `
    fakeDom += card;
}
TRENDING_MOVIES_WRAPPER.innerHTML = fakeDom;

const RECENT_MOVIES_WRAPPER = document.querySelector('.recent__movies-wrapper')

fakeDom = '';
for (let i = 0; i < 6; i++) {
  const result = popularMovies.results[i];
  let title = result.original_title;
  let image = `${baseImgUrl}${result.poster_path}`;
  let releaseDate = result.release_date;
  let rating = result.vote_average;
  let card = `
            <div class="recent__movies__block" id='${result.id}'>
              <img width='100' src="${image}" alt="" />
              <div class="recent-movie__description-title">
                <h3 class="recent-movie__title">${title}</h3>
                <span class="recent-movie__updated">Rating: ${rating} </span>
                <span class="recent-movie__date"> ${releaseDate}</span>
              </div>
            </div>`

 fakeDom += card;      
}

RECENT_MOVIES_WRAPPER.innerHTML = fakeDom;

fakeDom = '';
const NEW_MOVIES_WRAPPER = document.querySelector('.new-release__movies-wrapper');

for (let i = 0; i < 8; i++) {
  const element = newReleaseMovies.results[i];
  let card = `<div class="new-release__movie-block movie" id='${element.id}'>
                <img src="${baseImgUrl}${element.poster_path}" alt="">
                <div class="new-release__movie__description">
                  <h3 class="new-release__movie-title">${element.original_title}</h3>
                  <span>HD</span>
                  <span class="new-release__movie-length">
                    ${element.release_date}
                  </span>
                </div>
              </div>`
  fakeDom += card;
}

NEW_MOVIES_WRAPPER.innerHTML = fakeDom;

const urlNewSeries = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
const optionsNewSeries = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
  }
};

const newReleaseSeries = await fetchMovies(urlNewSeries, optionsNewSeries)

const NEW_SERIES_WRAPPER = document.querySelector('.new-release-series__movies-wrapper');

fakeDom = '';
for (let i = 0; i < 8; i++) {
  const element = newReleaseSeries.results[i];
  let card = `<div class="new-release__movie-block series" id='${element.id}'>
                <img src="${baseImgUrl}${element.poster_path}" alt="">
                <div class="new-release__movie__description">
                  <h3 class="new-release__movie-title">${element.original_name}</h3>
                  <span>HD</span>
                  <span class="new-release__movie-length">
                    ${element.first_air_date}
                  </span>
                </div>
              </div>`
  fakeDom += card;
}

NEW_SERIES_WRAPPER.innerHTML = fakeDom;



const urlRecommended = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=5';
const optionsRecommended = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
}};

const urlRecommendedSeries = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=4`;
const recommendedMovies = await fetchMovies(urlRecommended, optionsRecommended);
const recommendedSeries = await fetchMovies(urlRecommendedSeries, optionsRecommended);


const SERIES_BUTTON = document.querySelector('.recommended__options-series');
const MOVIES_BUTTON = document.querySelector('.recommended__options-movies');
MOVIES_BUTTON.classList.add(`recommended__option--active`)

renderRecommended(recommendedMovies)

SERIES_BUTTON.addEventListener('click', function() {
  MOVIES_BUTTON.classList.toggle('recommended__option--active');
  SERIES_BUTTON.classList.toggle('recommended__option--active');
  renderRecommended(recommendedSeries)
})

MOVIES_BUTTON.addEventListener('click', function() {
  MOVIES_BUTTON.classList.toggle('recommended__option--active');
  SERIES_BUTTON.classList.toggle('recommended__option--active');
  renderRecommended(recommendedMovies);
})

function renderRecommended(arr) {
  let fakeDom = '';
  for (let i = 0; i < 16; i++) {
    const element = arr.results[i];
    let card = `<div class="new-release__movie-block recommended" id='${element.id}'>
                  <img src="${baseImgUrl}${element.poster_path}" alt="">
                  <div class="new-release__movie__description">
                    <h3 class="new-release__movie-title">${element.original_title}</h3>
                    <span>HD</span>
                    <span class="new-release__movie-length">
                      ${element.release_date}
                    </span>
                  </div>
                </div>`
    fakeDom += card;
  }
  document.querySelector('.recommended__movies-wrapper').innerHTML = fakeDom;
}

// ! Listener to the whole main element so that JS can listen to the clicks on movies

document.querySelector('main')
  .addEventListener('click', function(event) {
    if (!event.target.classList[0].includes('block')) {
      return;
    }
    const data = determineDataSource(event.target);
    localStorage.setItem('details', JSON.stringify(data));
    window.location.href = `./details.html?id=${event.target.id}`
  })

function determineDataSource(target) {
  const firstClass = target.classList[0]
  let data = null;
  if (firstClass.includes('trending')) {
    data = topRatedMovies.results;
  } else if (firstClass.includes('recent')) {
    data = popularMovies.results;
  } else if (target.classList[1] == 'recommended') {
    if (SERIES_BUTTON.classList[1] == 'recommended__option--active') {
      data = recommendedSeries.results;
    } else if (MOVIES_BUTTON.classList[1] == 'recommended__option--active') {
      data = recommendedMovies.results;
    } 
  } else if (firstClass.includes('new-release')) {
    if (target.classList[1] == 'movie') {
      data = newReleaseMovies.results;
    } else if (target.classList[1] == 'series') {
      data = newReleaseSeries.results;
    }
  } 
  return data;
}
