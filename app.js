const newBtn = document.getElementById('new-book-btn')
const form = document.querySelector('#form');

//submit new book
newBtn.addEventListener("click",openForm);
form.addEventListener("submit",getBook);



let myLibrary = [];

//book constructor
function Book(
    title = 'Unknown', 
    author = 'Unknown', 
    pageCount = 'Unknown', 
    read = false
    ) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
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
    return myLibrary;
}

//open form
function openForm(){
    document.getElementById("form").style.display = "block";
}

//Getting info from form and converting it to js
function getBookFromForm(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    return new Book(title,author,pages,read);
}

// fixed
function getBook(e){
    e.preventDefault();
    return addBookToLibrary(getBookFromForm()); 
}


function displayBooks(library){
    for (book in library){
        const list = document.querySelector('#book-list');
        const row  = document.createElement('li');
        row.textContent = `${book.title}`
        list.appendChild(row);
        console.log('its working')
    }
}

displayBooks(myLibrary);

// //console stuff
// const theHobbit = new Book('The Hobbit', 'JJ tolkein');
// // console.log(theHobbit);
// addBookToLibrary(theHobbit);
// // addBookToLibrary(theHobbit);
// // addBookToLibrary(theHobbit);
// // console.log(displayBooks());

// // console.log(myLibrary);
// // console.table(JSON.stringify(myLibrary));