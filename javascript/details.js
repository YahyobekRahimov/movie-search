import { getGenresNames } from "./functions.js";
import { movieGenres, seriesGenres } from "./constants.js";

window.onload = async function() {
  await renderDetails();  
  const LIKE_BUTTON = document.querySelector('.movie-details__like-button');
  const DISLIKE_BUTTON = document.querySelector('.movie-details__dislike-button');

  const DISLIKE_IMG = DISLIKE_BUTTON.children[0];
  const LIKE_IMG = LIKE_BUTTON.children[0];
  LIKE_BUTTON.addEventListener('click', function() {
    if (LIKE_IMG.getAttribute('fill') == 'green') {
      LIKE_IMG.setAttribute('fill', 'none');
      return;
    }
    LIKE_IMG.setAttribute('fill', 'green');
    DISLIKE_IMG.setAttribute('fill', 'none');
  })
  
  DISLIKE_BUTTON.addEventListener('click', function() {
    if (DISLIKE_IMG.getAttribute('fill') == 'red') {
      DISLIKE_IMG.setAttribute('fill', 'none');
      return;
    }
    DISLIKE_IMG.setAttribute('fill', 'red');
    LIKE_IMG.setAttribute('fill', 'none');
  })
}



function renderDetails() {
  let urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');

  const data = JSON.parse(localStorage.getItem('details'));
  if (!data) {
    return;
  }
  let movieDetails = null;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.id == movieId) {
      movieDetails = element;
      break;
    }
  }

  const genres = getGenresNames(movieDetails.genre_ids, movieGenres, seriesGenres);
  let genreDom = '';
  genres.forEach(genre => {
    genreDom += `<li>${genre}</li>`
  })
  const baseImgUrl = `https://image.tmdb.org/t/p/w300/`;

  try {
    let page = `
    <img src="${baseImgUrl}${movieDetails.poster_path}" alt="">
                  <div class="movie-details__block">
                      <div class="title-like-wrapper">
                          <h2 class="movie-details__title">
                              ${movieDetails.original_title || movieDetails.original_name}
                          </h2>
                          <div class="like-dislike-wrapper">
                              <button class="movie-details__like-button">
                                  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                  <svg xmlns="http://www.w3.org/2000/svg" stroke='green' stroke-width="1.3px" fill="none" width="45px" height="45px" viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/></svg>                                 
                              </button>
                              <button class="movie-details__dislike-button">
                                  <?xml version="1.0" ?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                  <svg fill="none" stroke='red' stroke-width="1.8px" width="45px" height="45px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Glyph" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M2.156,14.901l2.489-8.725C5.012,4.895,6.197,4,7.528,4h13.473C21.554,4,22,4.448,22,5v14  c0,0.215-0.068,0.425-0.197,0.597l-5.392,7.24C15.813,27.586,14.951,28,14.027,28c-1.669,0-3.026-1.357-3.026-3.026V20H5.999  c-1.265,0-2.427-0.579-3.188-1.589C2.047,17.399,1.809,16.12,2.156,14.901z" id="XMLID_259_"/><path d="M25.001,20h4C29.554,20,30,19.552,30,19V5c0-0.552-0.446-1-0.999-1h-4c-0.553,0-1,0.448-1,1v14  C24.001,19.552,24.448,20,25.001,20z M27.001,6.5c0.828,0,1.5,0.672,1.5,1.5c0,0.828-0.672,1.5-1.5,1.5c-0.828,0-1.5-0.672-1.5-1.5  C25.501,7.172,26.173,6.5,27.001,6.5z" id="XMLID_260_"/></svg>                                 
                              </button>
                          </div>
                          <button class="movie-details__add-to-favorite">
                              <img src="./images/plus.svg" alt="plus">
                              Add to Favorite
                          </button>
                      </div>
                      <div class="movie-details__small-details">
                          <ul class="movie-details__genres-list">
                            ${genreDom}
                          </ul>
                          <span class="movie-details__release-year"> <img src="./images/year.svg" alt="year">2023</span>
                          <span class="movie-details__rating"><img src="./images/star.svg" alt="star">8.5</span>
                      </div>
                      <p class="movie-details__overview">
                          ${movieDetails.overview}
                      </p>    
                      <ul class="movie-details__intricate-details">
                          ${movieDetails.origin_country ? `<li>Country : ${movieDetails.origin_country[0]} </li>` : `<li>Language : ${movieDetails.original_language}</li>`}
                          <li>Genre : ${genres.join(', ')}</li>
                          <li>Date Release : ${movieDetails.release_date}</li>
                      </ul>
                  </div>`
    document.querySelector('.movie-details__container').innerHTML = page;
  } catch (error) {
    console.log('Some info may be missing', error.stack);
  }
}
