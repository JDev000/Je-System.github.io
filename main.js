const I_P = document.getElementById('incorrect-pass');
const body = document.body;

const form_C = document.querySelector('.form-container');
const logBTN = document.getElementById('log-btn')
const pass = document.getElementById('password');
const displayNone = document.getElementById('display-none');


const incorrectPassword = document.getElementById('incorrect-pass');


function loadHome() {
    window.location.href = 'https://jdev000.github.io/Je-System.github.io/pages/home.html';
}


logBTN.addEventListener('click', loadNow => {

    if (pass.value == 'admin') {
        loadHome()
        pass.value = ''
    } else {
        displayNone.setAttribute('id', 'incorrect-pass');

        setTimeout(() => {
            displayNone.remove(); // Remove the entire div element
            location.reload(); // Refresh the page
        }, 2500)
    }

})




