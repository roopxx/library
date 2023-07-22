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

// Function to display a single book in the library
function displayBook(book) {
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

  div.append(title);
  div.append(author);
  div.append(pages);
  div.append(status);
  div.append(removeBtn);

  title.innerText = book.title;
  author.innerText = book.author;
  pages.innerText = book.pages + " pages";
  status.innerText = book.status;

  // Add event listener for status button
  status.addEventListener("click", () => {
    book.status = book.status === "Read" ? "Not read" : "Read";
    displayBooks();
  });

  // Toggle color based on status
  status.classList.toggle("btn-light-green", book.status === "Read");
  status.classList.toggle("btn-light-red", book.status === "Not read");

  // Add event listener for remove button
  removeBtn.addEventListener("click", () => {
    removeBookByTitle(book.title);
  });

  return div;
}

// Function to display books in the library
function displayBooks() {
  const view = document.querySelector(".flexview");
  view.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (const book of myLibrary) {
    const bookElement = displayBook(book);
    fragment.appendChild(bookElement);
  }

  view.appendChild(fragment);
}

function clearForm() {
  document.querySelector('input[id="title"]').value = null;
  document.querySelector('input[id="author"]').value = null;
  document.querySelector('input[id="pages"]').value = null;
  document.querySelector('input[id="pages"]').value = null;
  document.querySelector('input[id="status"]').checked = false;
}

// Function to remove a book by its title
function removeBookByTitle(bookTitle) {
  myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
  displayBooks();
}

// Variables declaration
const addBookBtn = document.querySelector(".add-book");
const resetLibraryBtn = document.querySelector(".reset-library");
const addBtn = document.querySelector(".add-button");
const formDisplay = document.querySelector(".overlay");
const bookSection = document.querySelector(".display-book");

// Event Listeners
addBookBtn.addEventListener("click", () => {
  formDisplay.classList.toggle("formDisplay");
  bookSection.classList.toggle("blur");
});

resetLibraryBtn.addEventListener("click", () => {
  if (confirm("Do you want to delete all your books data?")) {
    myLibrary = [];
    displayBooks();
  }
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
    displayBooks();
  }
  formDisplay.classList.toggle("formDisplay");
  bookSection.classList.toggle("blur");
  clearForm();
});
