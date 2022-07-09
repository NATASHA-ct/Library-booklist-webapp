/* eslint max-classes-per-file: ["error", 3] */

// Book Class: Represents a Book
class Book {
  constructor(title, author, size) {
    this.title = title;
    this.author = author;
    this.size = size;
  }
}

// Store Class: handles local storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// awesome Class: Handle UI Tasks
class awesomeBooks {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => awesomeBooks.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    const listBook = document.createElement('div');
    listBook.classList.add('the-book');

    listBook.innerHTML = `
      <div class="book-details">
        <p class="infor">"${book.title}"</p>
        <p>by</p>
        <p class="infor">${book.author}</p>
        <button class="delete">Remove</button>
      </div>
      
      `;

    list.appendChild(listBook);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static clearField() {
    document.querySelector('#new-title').value = '';
    document.querySelector('#new-author').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', awesomeBooks.displayBooks);

// Event: Add a Book
document.querySelector('#new-book').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#new-title').value;
  const author = document.querySelector('#new-author').value;

  // Instatiate book
  const book = new Book(title, author);

  // Add Book to UI
  awesomeBooks.addBookToList(book);
  
  alert("Your book has been added,check your booklist");

  // Store.addBook(book);
  Store.addBook(book);

  // clear fields
  awesomeBooks.clearField();
});

// Event: Remove a Book
document.querySelector('#all-books').addEventListener('click', (e) => {
  awesomeBooks.deleteBook(e.target);

  Store.removeBook(e.target.previousElementSibling.textContent);
});

// Date and Time
const d = new Date();
document.getElementById('date').innerHTML = d;

// Activate and desactivate sections

const allBooksSection = document.getElementById('book-library');
const addNewBookSection = document.getElementById('add-new-book');
const contactSection = document.getElementById('contact-section');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

listLink.addEventListener('click', () => {
  allBooksSection.classList.remove('hide');
  addNewBookSection.classList.add('hide');
  contactSection.classList.add('hide');
});

// addLink
addLink.addEventListener('click', () => {
  allBooksSection.classList.add('hide');
  addNewBookSection.classList.remove('hide');
  contactSection.classList.add('hide');
});

// contactLink
contactLink.addEventListener('click', () => {
  allBooksSection.classList.add('hide');
  addNewBookSection.classList.add('hide');
  contactSection.classList.remove('hide');
});
