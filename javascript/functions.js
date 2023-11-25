function handleLoginSignupButton() {
    const SIGN_UP_LOGIN_BUTTON = document.querySelector('.sign-up-login');
    SIGN_UP_LOGIN_BUTTON.addEventListener('click', function() {
        const hasAccount = JSON.parse(localStorage.getItem('hasAccount')) ?? false;
        window.location.href = hasAccount ? 'login.html' : 'sign-up.html';
    })
}

async function fetchTopRatedMovies() {
    try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MwYWZlMTYyNjAwNWM5MzAzNDMyMzVjNTYzYWQ2MiIsInN1YiI6IjY1NjA2NGVmMmIxMTNkMDEwY2MwYjU2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U_sA7zS9sks9WxpONrqC-vdjwqgn8Z7qc2TayDs7Vmg'
            }
        };
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status} `)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data: `, error.message);
    }
}

async function fetchMovies(url, options) {
    try {
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error(`Failed to fetch data. Status: ${res.status}`)
        }
    
        const data = await res.json();
        return data
    } catch (error) {
        console.error('Error fetching data: ', error.message);
    }
}

function getGenresNames(genresIDS, movieGenres, seriesGenres) {
    let genreNames = [];
    genresIDS.forEach(genreID => {
      movieGenres.forEach(element => {
        if (element.id == genreID) {
          genreNames.push(element.name)
        }
      })
      if (!(genresIDS.length === genreNames.length)) {
        genreNames = [];
        genresIDS.forEach(genreID => {
          seriesGenres.forEach(element => {
            if (element.id == genreID) {
              genreNames.push(element.name);
            }
          })
        })
      }
    })
    return genreNames; 
}

export { handleLoginSignupButton, fetchTopRatedMovies, getGenresNames, fetchMovies };