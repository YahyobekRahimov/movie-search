function handleLoginSignupButton() {
    const SIGN_UP_LOGIN_BUTTON = document.querySelector('.sign-up-login');
    SIGN_UP_LOGIN_BUTTON.addEventListener('click', function() {
        const hasAccount = JSON.parse(localStorage.getItem('hasAccount')) ?? false;
        window.location.href = hasAccount ? 'login.html' : 'sign-up.html';
    })
}

function displayElementsInArray(arr, parent) {
    let fakeDom = '';
    arr.forEach(element => {
        fakeDom += element;
    });
    parent.innerHTML = fakeDom;
}

export { handleLoginSignupButton, displayElementsInArray };