
const newBtn = document.getElementById('new-book-btn')
const closeBtn = document.getElementById('close-btn')
const form = document.querySelector('form');
const formId = document.getElementById('form')
const bookCards = document.getElementById('book-cards')

//book constructor
class Book {
    constructor(
        title = 'Unknown', 
        author = 'Unknown', 
        read = false,
        notes = 'Unknown'
        ) {
        this.title = title;
        this.author = author;
        this.read = read;
        this.notes = notes;
    }
}

//Library 
let myLibrary;

//UI class handles all UI methods 
class UI {

        //open form
    static openForm(){
        form.reset();
        formId.style.display = "block";
    }

    //close form
    static closeForm(){
        formId.style.display = "none";
    }

    //displays books in DOM
    static displayBooks(){
        const myLibrary = Store.getBooks();
        myLibrary.forEach((book) => UI.addBookToDOMList(book))
        console.log('displayBooks is working')
    }

    //adds a new book to list
    static addBookToDOMList(book){
    
        const card = document.createElement('div')
        const cardBody = document.createElement('div');
        const title = document.createElement('h5');
        const author = document.createElement('h6');
        const notes = document.createElement('p');
        const readBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
    
        title.textContent = book.title;
        author.textContent = book.author;
        notes.textContent = book.notes;
        deleteBtn.textContent = 'X';
    
        card.className = 'card';
        cardBody.className = 'card-body';
        title.className = 'card-title';
        author.className = 'card-subtitle mb-2 text-muted';
        notes.className = "card-text";
        deleteBtn.className = "btn btn-danger btn-sm float-end delete";

        if (book.read) {
            readBtn.textContent = 'Read'
            readBtn.className = 'btn read btn-success btn-sm';
        }
        else {
            readBtn.textContent = 'Not Read'
            readBtn.className = 'btn read btn-light btn-sm';

        }
    
        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(notes);
        cardBody.appendChild(readBtn);
        cardBody.appendChild(deleteBtn);
        card.appendChild(cardBody)
        bookCards.appendChild(card);
    
        console.log('AddBooktoDOMList is working')
    }

    //handles read and delete buttons
    static handleButtons(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            Store.removeBook(el.parentElement.firstElementChild.textContent)
                }
        else if (el.classList.contains('read')) {
            if (el.textContent === 'Read') {
                el.textContent = 'Not Read'
                el.className = 'btn read btn-light btn-sm';
            }
            else { 
                el.textContent = 'Read' 
                el.className = 'btn read btn-success btn-sm';
        }  
        }
        Store.saveLocal();
        console.log(localStorage)
        
        
    }
}

class Store {

    static saveLocal(){
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }
    
    //need to stringify objects bc can only savestrings in local storage
    static getBooks(){

        if(localStorage.getItem('myLibrary') === null) {
            myLibrary = [];
        }

        else {
            myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
        }
        console.log('getBooks is working')
        return myLibrary;
        
    }

    static addBookToLibrary(book){
        const myLibrary = Store.getBooks();
        myLibrary.push(book);
        Store.saveLocal()
    }

    static removeBook(bookTitle){
        myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
        Store.saveLocal();
    }
}
 

function addBook(e){
    e.preventDefault();
    console.log('addbook is working');

    //getting info from form
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const read = document.querySelector('#read').checked;
    const notes = document.querySelector('#notes').value;

    const book = new Book(title,author,read,notes);

    //adding book to list 
    UI.addBookToDOMList(book);
    Store.addBookToLibrary(book);
    UI.closeForm();
}


//Events
newBtn.addEventListener("click", UI.openForm);
form.addEventListener("submit", addBook);
closeBtn.addEventListener("click", UI.closeForm);
document.addEventListener('DOMContentLoaded', UI.displayBooks);
bookCards.addEventListener('click', (e) => { 
    UI.handleButtons(e.target)
    // Store.removeBook(e.target.parentElement.firstElementChild.textContent)
});
// bookCards.addEventListener('click', (el) => {
//     // el.preventDefault();
//     // console.log(e.target)
//     UI.readButton(el)
// })

console.log(localStorage);
