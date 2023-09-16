//Class declaration for book
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

//Class declaration for library with its methods
class Library {
  constructor() {
    this.myLibrary = [];
  }

  // Method to add a book to the library
  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  // Method to remove a book from the library by title
  removeBookByTitle(bookTitle) {
    this.myLibrary = this.myLibrary.filter((book) => book.title !== bookTitle);
  }

  // Method to toggle the status (Read/Not read) of a book
  toggleBookStatus(bookTitle) {
    const book = this.myLibrary.find((book) => book.title === bookTitle);
    if (book) {
      book.status = book.status === "Read" ? "Not read" : "Read";
    }
  }

  // Method to display all books in the library
  displayBooks() {
    const view = document.querySelector(".flexview");
    view.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (const book of this.myLibrary) {
      const bookElement = this.displayBook(book);
      fragment.appendChild(bookElement);
    }

    view.appendChild(fragment);
  }

  // Method to create the display for a single book
  displayBook(book) {
    const div = document.createElement("div");
    div.classList.add("book-sample");

    const title = document.createElement("p");
    title.classList.add("title");
    const author = document.createElement("p");
    author.classList.add("author");
    const pages = document.createElement("span");
    pages.classList.add("pages");
    const status = document.createElement("button");
    status.classList.add("status");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book");

    div.append(title);
    div.append(author);
    div.append(pages);
    div.append(status);
    div.append(removeBtn);

    title.innerText = book.title;
    author.innerText = book.author;
    pages.innerText = book.pages;
    status.innerText = book.status;

    status.addEventListener("click", () => {
      this.toggleBookStatus(book.title);
      this.displayBooks();
    });

    status.classList.toggle("btn-light-green", book.status === "Read");
    status.classList.toggle("btn-light-red", book.status === "Not read");

    removeBtn.addEventListener("click", () => {
      this.removeBookByTitle(book.title);
      this.displayBooks();
    });

    return div;
  }
}

const library = new Library();

const addBookBtn = document.querySelector(".add-book");
const resetLibraryBtn = document.querySelector(".reset-library");
const addBtn = document.querySelector(".add-button");
const formDisplay = document.querySelector(".overlay");
const bookSection = document.querySelector(".display-book");

addBookBtn.addEventListener("click", () => {
  formDisplay.classList.toggle("formDisplay");
  bookSection.classList.toggle("blur");
});

resetLibraryBtn.addEventListener("click", () => {
  if (confirm("Do you want to delete all your books data?")) {
    library.myLibrary = [];
    library.displayBooks();
  }
});

addBtn.addEventListener("click", () => {
  checkBookDetails();
  const bookTitle = document.querySelector('input[id="title"]').value;
  const bookAuthor = document.querySelector('input[id="author"]').value;
  const bookPages =
    document.querySelector('input[id="pages"]').value + " pages";
  const bookStatus = document.querySelector('input[id="status"]:checked').value;

  const bookExists = library.myLibrary.some((book) => book.title === bookTitle);
  if (bookExists) {
    alert("Book already exists!!");
    clearForm();
  } else {
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    library.addBookToLibrary(newBook);
    library.displayBooks();
  }
  formDisplay.classList.toggle("formDisplay");
  bookSection.classList.toggle("blur");
  clearForm();
});

function clearForm() {
  document.querySelector('input[id="title"]').value = null;
  document.querySelector('input[id="author"]').value = null;
  document.querySelector('input[id="pages"]').value = null;
  document.querySelector('input[id="pages"]').value = null;
  document.querySelector('input[id="status"]').checked = false;
}

// Validation

function checkBookDetails() {
  const bookTitle = document.getElementById("title");
  const bookAuthor = document.getElementById("author");
  const bookPages = document.getElementById("pages");
  const status = document.getElementById("status");

  bookTitle.addEventListener("input", (event) => {
    if (bookTitle.validity.valueMissing) {
      bookTitle.validationMessage = "";
      bookTitle.setCustomValidity("Book title is a must.");
    } else {
      bookTitle.setCustomValidity("");
    }
  });

  bookAuthor.addEventListener("input", (event) => {
    if (bookAuthor.validity.valueMissing) {
      bookAuthor.setCustomValidity("Author name is also must.");
    } else {
      bookAuthor.setCustomValidity("");
    }
  });

  bookPages.addEventListener("input", (event) => {
    if (bookPages.validity.valueMissing) {
      bookPages.setCustomValidity("Book page count is also must.");
    } else if (bookPages.validity.rangeUnderflow) {
      bookPages.setCustomValidity(
        "Book is too short to be included in library, min 50 pages book"
      );
    } else {
      bookPages.setCustomValidity("");
    }
  });

  return true;
}
