// features I want to add/change: 
// 1. required field
//2. dont let number of pages go beyond -1
//3. add a card feaature where you can take notes on the book 
const newBtn = document.getElementById('new-book-btn')
const closeBtn = document.getElementById('close-btn')
const form = document.querySelector('form');
const formId = document.getElementById('form')
const bookCards = document.getElementById('book-cards')

//submit new book
newBtn.addEventListener("click", openForm);
form.addEventListener("submit", addBook);
closeBtn.addEventListener("click", closeForm);
// document.addEventListener('DOMContentLoaded', displayBooks);



const myLibrary = [
    {
        title: 'Book One',
        author: 'JD',
        notes: 'lorem loreal lorrl'
    }, 
    {
        title: 'Book Two',
        author: 'JD',
        notes: 'lorem loreal lorrl'
    }
];

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


//open form
function openForm(){
    form.reset();
    formId.style.display = "block";
}

function closeForm(){
    formId.style.display = "none";
}

function displayBooks(){
    myLibrary.forEach((book) => addBookToDOMList(book))
    console.log('displayBooks is working')
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
    addBookToDOMList(book);
    // displayBooks();
    closeForm();
    }


function addBookToDOMList(book){
    const card = document.createElement('div')
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const author = document.createElement('h6');
    const notes = document.createElement('p');
    const read = document.createElement('button');
    const deleteBtn = document.createElement('button');

    title.textContent = book.title;
    author.textContent = book.author;
    notes.textContent = book.notes;
    read.textContent = book.read;
    deleteBtn.textContent = 'X';

    card.className = 'card';
    cardBody.className = 'card-body';
    title.className = 'card-title';
    author.className = 'card-subtitle mb-2 text-muted';
    notes.className = "card-text";
    read.className = 'btn btn-sm';
    deleteBtn.className = "btn btn-danger btn-sm float-end delete";

    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(notes);
    cardBody.appendChild(read);
    cardBody.appendChild(deleteBtn);
    card.appendChild(cardBody)
    bookCards.appendChild(card);

    console.log('AddBooktoDOMList is working')

}

console.log(myLibrary)
