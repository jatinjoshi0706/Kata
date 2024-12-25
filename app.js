const readline = require("readline");

class Book {
  constructor(isbn, title, author, publicationYear) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.isAvailable = true; // Default to available
  }
}

class Library {
  constructor() {
    this.books = []; // Store all books
  }

  // Add a new book to the library
  addBook(isbn, title, author, publicationYear) {
    if (this.books.find((book) => book.isbn === isbn)) {
      throw new Error("Book with this ISBN already exists.");
    }
    const newBook = new Book(isbn, title, author, publicationYear);
    this.books.push(newBook);
  }

  viewAvailableBooks() {
    return this.books.filter((book) => book.isAvailable);
  }
}

const library = new Library();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\nLibrary Management System:");
  console.log("1. Add Book");
  console.log("2. View Available Books");
  console.log("Press 'q' to quit.");
  rl.question("Choose an option: ", handleInput);
}

function handleInput(input) {
  if (input.toLowerCase() === "q") {
    console.log("Exiting the Library Management System. Goodbye!");
    rl.close();
    return;
  }

  switch (input) {
    case "1":
      rl.question(
        "Enter ISBN, Title, Author, Publication Year (comma-separated): ",
        (data) => {
          const [isbn, title, author, year] = data
            .split(",")
            .map((item) => item.trim());
          try {
            library.addBook(isbn, title, author, parseInt(year));
            console.log("Book added successfully!");
          } catch (error) {
            console.log(error.message);
          }
          showMenu();
        }
      );
      break;
    case "2":
      const availableBooks = library.viewAvailableBooks();
      if (availableBooks.length > 0) {
        console.log("\nAvailable Books:");
        availableBooks.forEach((book) => {
          console.log(`${book.title} by ${book.author} (ISBN: ${book.isbn})`);
        });
      } else {
        console.log("No books available.");
      }
      showMenu();
      break;
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
      break;
  }
}

showMenu();

module.exports = Library;
