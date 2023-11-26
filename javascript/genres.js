import { fetchTopRatedMovies } from "./functions.js";
const baseImgUrl = `https://image.tmdb.org/t/p/w300/`;

let movie1 = (await fetchTopRatedMovies(1)).results;
let movie2 = (await fetchTopRatedMovies(2)).results;
let movie3 = (await fetchTopRatedMovies(3)).results;
let movie4 = (await fetchTopRatedMovies(4)).results;
let movie5 = (await fetchTopRatedMovies(5)).results;
let movie6 = (await fetchTopRatedMovies(6)).results;
let movie7 = (await fetchTopRatedMovies(7)).results;
let movie8 = (await fetchTopRatedMovies(8)).results;
let movie9 = (await fetchTopRatedMovies(9)).results;
let movie10 = (await fetchTopRatedMovies(10)).results;
let movie11 = (await fetchTopRatedMovies(11)).results;
let movie12 = (await fetchTopRatedMovies(12)).results;
let movie13 = (await fetchTopRatedMovies(13)).results;
let movie14 = (await fetchTopRatedMovies(14)).results;
let movie15 = (await fetchTopRatedMovies(15)).results;
let movie16 = (await fetchTopRatedMovies(16)).results;
let movie17 = (await fetchTopRatedMovies(17)).results;
let movie18 = (await fetchTopRatedMovies(18)).results;
let movie19 = (await fetchTopRatedMovies(19)).results;
let movie20 = (await fetchTopRatedMovies(20)).results;
let movie21 = (await fetchTopRatedMovies(21)).results;
let movie22 = (await fetchTopRatedMovies(22)).results;
let movie23 = (await fetchTopRatedMovies(23)).results;
let movie24 = (await fetchTopRatedMovies(24)).results;
let movies = [...movie1, ...movie2, ...movie3, ...movie4, ...movie5, ...movie6, ...movie7, ...movie8, ...movie9,
   ...movie10, ...movie11, ...movie12, ...movie13, ...movie14, ...movie15, ...movie16, ...movie17, ...movie18,
    ...movie19, ...movie20, ...movie21, ...movie22, ...movie23, ...movie24];

const urlParams = new URLSearchParams(window.location.search);
const genreId = urlParams.get('id');


let fakeDom = '';
for (let i = 0; i < 16; i++) {
  const movie = movies[i];
  movie.genre_ids.forEach(id => {
    if (id != genreId) {
      return;
    }
    let card = `<div class="new-release__movie-block recommended" id='${movie.id}'>
                  <img src="${baseImgUrl}${movie.poster_path}" alt="">
                  <div class="new-release__movie__description">
                    <h3 class="new-release__movie-title">${movie.original_title}</h3>
                    <span>HD</span>
                    <span class="new-release__movie-length">
                      ${movie.release_date}
                    </span>
                  </div>
                </div>`
    fakeDom += card;
  })
}

document.querySelector('.movies-genre__container').innerHTML = fakeDom;