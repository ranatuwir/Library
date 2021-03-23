// features I want to add/change: 
// 1. required field
//2. dont let number of pages go beyond -1
//3. add a card feaature where you can take notes on the book 
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


//open form
function openForm(){
    form.reset();
    formId.style.display = "block";
}

//close form
function closeForm(){
    formId.style.display = "none";
}

//UI class handles all UI methods 
class UI {

    //displays books in DOM
    static displayBooks(){
        const myLibrary = Store.getBooks();
        myLibrary.forEach((book) => UI.addBookToDOMList(book))
        console.log('displayBooks is working')
    }

    static addBookToDOMList(book){
    
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
        read.className = 'btn btn-default btn-sm';
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

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.remove();
        }

    }
}

class Store {
    
    //need to stringify objects bc can only savestrings in local storage
    static getBooks(){
        let myLibrary;
        if(localStorage.getItem('myLibrary') === null) {
            myLibrary = [];
        }

        else {
            myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
        }
        console.log('yes')
        return myLibrary;
        
    }

    static addBookToLibrary(book){
        const myLibrary = Store.getBooks();
        myLibrary.push(book);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }

    static removeBook(book, title){
        const myLibrary = Store.getBooks();

        myLibrary.forEach((title, index) => {
            if(book.title === title){
                myLibrary.splice(index, 1)
            }
        });

        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
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

    //instantiating book
    const book = new Book(title,author,read,notes);

    //adding book to list 
    UI.addBookToDOMList(book);
    Store.addBookToLibrary(book);
    closeForm();
}


//Events
newBtn.addEventListener("click", openForm);
form.addEventListener("submit", addBook);
closeBtn.addEventListener("click", closeForm);
document.addEventListener('DOMContentLoaded', UI.displayBooks);
bookCards.addEventListener('click', (e) => { 
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.firstElementChild.textContent)
});
