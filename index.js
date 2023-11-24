import { movieGenres, seriesGenres } from "./javascript/constants.js";
import { handleLoginSignupButton, fetchTopRatedMovies, getGenresNames, fetchPopularMovies } from "./javascript/functions.js";

handleLoginSignupButton();

const topRatedMovies = await fetchTopRatedMovies();

const popularMovies = await fetchPopularMovies();

const TRENDING_MOVIES_WRAPPER = document.querySelector('.trending__movies-wrapper');

const baseImgUrl = `https://image.tmdb.org/t/p/w300`;

let fakeDom = '';
for (let i = 1; i <= 3; i++) {
    const element = topRatedMovies.results[i];
    const genresArr = element.genre_ids;
    const genreNames = getGenresNames(genresArr, movieGenres, seriesGenres);
    let listOfGenres = '';
    genreNames.forEach(genre => {
      listOfGenres += `<li>${genre}</li>`
    })
    let card = `
                <div class="trending__movie">
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
TRENDING_MOVIES_WRAPPER.innerHTML += fakeDom;

const RECENT_MOVIES_WRAPPER = document.querySelector('.recent__movies-wrapper')

fakeDom = '';
for (let i = 0; i < 6; i++) {
  const result = popularMovies.results[i];
  let title = result.original_title;
  let image = `${baseImgUrl}${result.poster_path}`;
  let releaseDate = result.release_date;
  let rating = result.vote_average;
  let card = `
            <div class="recent__movies__block">
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