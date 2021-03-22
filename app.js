// features I want to add/change: 
// 1. required field
//2. dont let number of pages go beyond -1
//3. add a card feaature where you can take notes on the book 
const newBtn = document.getElementById('new-book-btn')
const closeBtn = document.getElementById('close-btn')
const form = document.querySelector('form');
const formId = document.getElementById('form')
const bookCards = document.querySelector('.book-cards')

//submit new book
newBtn.addEventListener("click", openForm);
form.addEventListener("submit", getBook);
closeBtn.addEventListener("click", closeForm);



let myLibrary = [];

//book constructor
function Book(
    title = 'Unknown', 
    author = 'Unknown', 
    pageCount = 'Unknown', 
    read = false,
    notes = 'Unknown'
    ) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.notes = notes;
}

//ok
// add book to library 
// using include method or can also use some method to test if
// title and author are the same. 
function addBookToLibrary(newBook){
    // if (myLibrary.includes(newBook) == false){
        myLibrary.push(newBook);
    // }
    // else console.log('Book already exists in library');
    console.log('addbooktolibrary is working')
    console.log(myLibrary)
    return myLibrary;
}

//open form
function openForm(){
    form.reset();
    formId.style.display = "block";
}

function closeForm(){
    formId.style.display = "none";
}

//Getting info from form and converting it to js
function getBookFromForm(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    const notes = document.querySelector('#notes').value;
    console.log('getbookfromform is working');
    return new Book(title,author,pages,read,notes);
}

// fixed
function getBook(e){
    e.preventDefault();
    console.log('getbook is working');
    return addBookToLibrary(getBookFromForm());   
}


function displayBooks(){
    for (let book in myLibrary){
        createBookCard(book)
    }
    console.log('displayBooks is working')
}

function createBookCard(){
    const card = document.createElementNS('div')
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const author = document.createElement('h6');
    const pages = document.createElement('h6');
    const notes = document.createElement('p');
    const read = document.createElement('button');
    const deleteBtn = document.createElement('button');

    card.className = 'card';
    cardBody.className = 'card-body';
    title.className = 'card-title';
    author.className = 'card-subtitle mb-2 text-muted';
    pages.className = 'card-subtitle mb-2 text-muted';
    notes.className = "card-text";
    read.className = 'btn-group btn-sm';
    deleteBtn.className = "btn btn-danger btn-sm float-end delete";

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    notes.textContent = `${book.notes}`;
    deleteBtn.textContent = 'X';

    cardBody.appendChild(title);
    cardBody.appendChild(author);
    cardBody.appendChild(pages);
    cardBody.appendChild(notes);
    cardBody.appendChild(deleteBtn);
    card.appendChild(cardBody)
    bookCards.appendChild(card);

    console.log('createBookCArd is working')

}

