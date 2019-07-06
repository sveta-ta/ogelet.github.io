const passwordInput = document.querySelector('#input-password');
const buttonTogglePassword = document.querySelector('#show-password');
const buttonToggleMenu = document.querySelector('#burger-menu');
const sideMenu = document.querySelector('#side-menu');

buttonTogglePassword.addEventListener('click', togglePassword);
buttonToggleMenu.addEventListener('click', toggleMenu);

function togglePassword(event) {
    event.preventDefault();
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        buttonTogglePassword.classList.add('visible');
    } else {
        passwordInput.type = "password";
        buttonTogglePassword.classList.remove('visible');
    }
};

function toggleMenu() {
    if (sideMenu.classList.contains('hidden')) {
        sideMenu.classList.remove('hidden');
        buttonToggleMenu.classList.add('close');
    } else {
        sideMenu.classList.add('hidden');
        buttonToggleMenu.classList.remove('close');
    }
};