// Data array
let myLibrary = [];

// Object to hold book data
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Function to add new book to array myLibrary
function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
  var newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
  myLibrary.push(newBook);
}

// Function to display books in the library
function displayBook() {
  for (var book of myLibrary) {
    var view = document.querySelector(".flexview");
    var div = document.createElement("div");
    div.classList.add("book-sample");
    var title = document.createElement("p");
    title.classList.add("title");
    var author = document.createElement("p");
    author.classList.add("author");
    var pages = document.createElement("span");
    pages.classList.add("pages");
    var status = document.createElement("button");
    status.classList.add("status");
    var removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book");
    removeBtn.textContent = "Remove";

    div.append(title);
    div.append(author);
    div.append(pages);
    div.append(status);
    div.append(removeBtn);
    view.append(div);

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;
    status.innerText = book.status;
  }
}

// Variables declaration
var addBookBtn = document.querySelector(".add-book");
var resetLibraryBtn = document.querySelector(".reset-library");
var addBtn = document.querySelector(".add-button");
var formDisplay = document.querySelector(".overlay");
var container = document.querySelector(".container");

// Event Listeners
addBookBtn.addEventListener("click", () => {
  formDisplay.classList.toggle("formDisplay");
  container.classList.toggle("blur");
});

resetLibraryBtn.addEventListener("click", () => {
  var bookDisplay = document.querySelector(".display-book");
  confirm("Do you want to delete all your books data?");
  bookDisplay.style.display = "none";
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  var bookTitle = document.querySelector('input[id="title"]').value;
  var bookAuthor = document.querySelector('input[id="author"]').value;
  var bookPages = document.querySelector('input[id="pages"]').value;
  var bookStatus = document.querySelector('input[id="status"]:checked').value;

  // To check whether the book already is on display
  var bookExists = myLibrary.some((book) => book.title === bookTitle);
  if (bookExists) {
    alert("Book already exists!!");
  } else {
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    displayBook();
  }
  formDisplay.classList.toggle("formDisplay");
  container.classList.toggle("blur");
});
