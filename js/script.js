// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');

        } else { // if want to use animation that repeat on scroll use this
            sec.classList.remove('show-animate');
        }

    });

    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyikrn9wEZAhNcy11_Az8kksGCQOCDHK5m2DJVN0PCx8rjtR1sLNZfGm7krITaE3o1n/exec'
const form = document.forms['contact-me']

const divButton = form.querySelector('#send-button')
const submitButton = form.querySelector('button[type="submit"]')
const submitedMsg = document.createElement('div')

submitedMsg.classList.add('submited-msg')

const message = document.createElement('p')
message.textContent = '😇 Thank you for your message, I am excited to read it.'
submitedMsg.appendChild(message)

const span = document.createElement('span')
span.classList.add('animate', 'scroll')
span.setAttribute('style', '--i:1.9;')
submitedMsg.appendChild(span)

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            form.querySelectorAll('.input-field, input, .textarea-field, textarea').forEach(field => {
                field.disabled = true
                field.classList.add('submited');
            })
            submitButton.disabled = true
            divButton.style.display = 'none'
            submitedMsg.style.display = 'flex'
            form.appendChild(submitedMsg)
        })
        .catch(error => {
            message.textContent = '🤔 There was an error submitting your message. Please try again.'
            form.querySelectorAll('.input-field, input, .textarea-field, textarea').forEach(field => {
                field.disabled = true
                field.classList.add('submited');
            })
            submitButton.disabled = true
            divButton.style.display = 'none'
            submitedMsg.style.display = 'flex'
            form.appendChild(submitedMsg)
        })
})