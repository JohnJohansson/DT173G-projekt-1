// A JS for toggling the neon light 

// Vars connecting to the toggle-theme button
const toggle = document.querySelector('.toggle-theme input[type="checkbox"]');
// const currentTheme = localStorage.getItem('theme');

// An event listener for the toggle button
toggle.addEventListener('change', toggleTheme, false);

// a function to toggle the theme
function toggleTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('theme', 'neon');
    }
    else {
        document.documentElement.setAttribute('theme', 'normal');
    }
};