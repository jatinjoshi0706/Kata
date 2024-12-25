const Library = require('./app'); 

describe("Library Management System - Add Books", () => {
  let library;

  beforeEach(() => {
    // Initialize a new library before each test
    library = new Library();
  });

  test("should add a new book successfully", () => {
    library.addBook("12345", "Book One", "Author A", 2021);
    expect(library.books.length).toBe(1);
    expect(library.books[0].title).toBe("Book One");
  });

  test("should not allow adding a book with duplicate ISBN", () => {
    library.addBook("12345", "Book One", "Author A", 2021);
    expect(() => {
      library.addBook("12345", "Duplicate Book", "Author B", 2022);
    }).toThrow("Book with this ISBN already exists.");
  });
});
