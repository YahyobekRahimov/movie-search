const SUBMIT_BUTTON = document.getElementById('submit');

const USERNAME = document.getElementById('username');
const EMAIL = document.getElementById('email');
const PASSWORD = document.getElementById('password');
const CONFIRM_PASSWORD = document.getElementById('confirmPassword');

const ERROR_LIST = document.querySelector('.error');

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
SUBMIT_BUTTON.addEventListener('click', function(event) {
  event.preventDefault();
  if (!validate()) {
    return;
  }
  const user = new User(Date.now(), USERNAME.value, EMAIL.value, PASSWORD.value);
  const data = getDataFromLocalStorage('users');
  data.push(user);
  localStorage.setItem("users", JSON.stringify(data));
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  document.cookie = `username=${user.username}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `email=${user.email}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `id=${user.id}; expires=${expirationDate.toUTCString()}; path=/`;

  window.location.href = `./index.html?id=${user.id}`;
})

function validate() {
  if (!USERNAME.value || USERNAME.value.length <= 3) {
    ERROR_LIST.innerHTML = 'Please, enter a valid username';
    USERNAME.style.outline = '2px solid red';
    USERNAME.value = '';
    return false;
  }
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!EMAIL.value || !emailPattern.test(EMAIL.value)) {
    ERROR_LIST.innerHTML = 'Please, enter a valid email';
    EMAIL.style.outline = '2px solid red';
    EMAIL.value = '';
    return false;
  }
  if (PASSWORD.value.length < 8) {
    ERROR_LIST.innerHTML = 'Please, enter a valid password'
    PASSWORD.style.outline = '2px solid red';
    PASSWORD.innerHTML = '';
    return false;
  }
  if (CONFIRM_PASSWORD.value !== PASSWORD.value) {
    ERROR_LIST.innerHTML = `Your Passwords don't match`
    PASSWORD.style.outline = '2px solid red'
    CONFIRM_PASSWORD.style.outline = '2px solid red'
    PASSWORD.value = '';
    CONFIRM_PASSWORD.value = '';
    return false;
  }
  
  const data = getDataFromLocalStorage('users');

  if (!data.length) {
    return true;
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (USERNAME.value === element.username) {
      ERROR_LIST.innerHTML = 'This username is already taken';
      return false;
    }
    if (element.email === EMAIL.value) {
      ERROR_LIST.innerHTML = 'User with this email already exists';
      return false;
    }
  }

  return true;
}

function getDataFromLocalStorage(dataName) {
  return JSON.parse(localStorage.getItem(dataName)) ?? [];
}
