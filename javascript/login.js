const SUBMIT_BUTTON = document.getElementById('submit');
const USERNAME_EMAIL = document.getElementById('username');
const PASSWORD = document.getElementById('password');
const ERROR = document.querySelector('.error');

SUBMIT_BUTTON.addEventListener('click', function(event) {
  event.preventDefault();
  if (!validate()) {
    return;
  };
  const users = JSON.parse(localStorage.getItem('users')) ?? [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (USERNAME_EMAIL.value == user.email && PASSWORD.value == user.password) {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      document.cookie = `username=${user.username}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `email=${user.email}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `id=${user.id}; expires=${expirationDate.toUTCString()}; path=/`;
      window.location.href = `./index.html?id=${user.id}`;
      return;
    }
  }
})

function validate() {
  if (!USERNAME_EMAIL.value) {
    ERROR.innerHTML = `Please, enter an email or username`;
    USERNAME_EMAIL.value = '';
    USERNAME_EMAIL.focus();
    return false;
  }
  if (!PASSWORD.value || PASSWORD.value.length < 8) {
    ERROR.innerHTML = 'You must enter a valid password';
    PASSWORD.value = '';
    PASSWORD.focus();
    return false;
  }
  return true;
}