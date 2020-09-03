
// const greeting = 'Hello World';
// console.log(greeting);

// const person = require('./mymodule1');
// import {person, sayHello} from './mymodule2';

// import * as mod from './mymodule2';
// console.log(mod.person.name);
// console.log(mod.sayHello());

// import greeting from "./mymodule2";
// console.log(greeting);


import {http} from './http';
import {ui} from './ui';

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', enableEdit);

function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const data = {
        title, body
    }

    http.post('http://localhost:3000/posts', data)
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts()
        })
        .catch(err => console.log(err));

    // e.preventDefault();
}

function enableEdit(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            title,
            body
        }

        ui.fillForm(data);
    }
    e.preventDefault();
}
