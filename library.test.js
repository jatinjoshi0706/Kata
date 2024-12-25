const Library = require("./app");

describe("Library Management System - Add and View Books", () => {
  let library;

  beforeEach(() => {
    // Initialize a new library before each test
    library = new Library();
  });

  // Test for adding books
  test("should add a new book successfully", () => {
    library.addBook("12345", "Book One", "Author A", 2021);
    expect(library.books.length).toBe(1);
    expect(library.books[0].title).toBe("Book One");
    expect(library.books[0].isAvailable).toBe(true); // Verify default availability
  });

  test("should not allow adding a book with duplicate ISBN", () => {
    library.addBook("12345", "Book One", "Author A", 2021);
    expect(() => {
      library.addBook("12345", "Duplicate Book", "Author B", 2022);
    }).toThrow("Book with this ISBN already exists.");
  });

  // Test for viewing available books
  describe("View Available Books", () => {
    test("should return a list of all available books", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      library.addBook("67890", "Book Two", "Author B", 2020);

      const availableBooks = library.viewAvailableBooks();
      expect(availableBooks.length).toBe(2);
      expect(availableBooks[0].isbn).toBe("12345");
      expect(availableBooks[1].isbn).toBe("67890");
    });

    test("should return an empty list if no books are available", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      library.addBook("67890", "Book Two", "Author B", 2020);

      // Simulate all books being unavailable
      library.books.forEach((book) => (book.isAvailable = false));

      const availableBooks = library.viewAvailableBooks();
      expect(availableBooks.length).toBe(0);
    });

    test("should handle no books in the library", () => {
      const availableBooks = library.viewAvailableBooks();
      expect(availableBooks.length).toBe(0);
    });
  });

  describe("Borrow Books", () => {
    test("should borrow a book successfully", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      library.borrowBook("12345");
      expect(library.books[0].isAvailable).toBe(false); // Verify that the book is now unavailable
    });

    test("should not allow borrowing a non-existent book", () => {
      expect(() => {
        library.borrowBook("99999"); // ISBN that doesn't exist
      }).toThrow("Book not found.");
    });

    test("should not allow borrowing an unavailable book", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      library.borrowBook("12345"); // First borrow the book
      expect(() => {
        library.borrowBook("12345"); // Try to borrow it again
      }).toThrow("Book is currently not available.");
    });
  });

  // Test to return the book
  describe("Return Books", () => {
    test("should return a book successfully", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      library.borrowBook("12345"); // Borrow the book first
      library.returnBook("12345"); // Now return it
      expect(library.books[0].isAvailable).toBe(true); // Verify that the book is now available
    });

    test("should not allow returning a non-existent book", () => {
      expect(() => {
        library.returnBook("99999"); // ISBN that doesn't exist
      }).toThrow("Book not found.");
    });

    test("should not allow returning a book that was not borrowed", () => {
      library.addBook("12345", "Book One", "Author A", 2021);
      expect(() => {
        library.returnBook("12345"); // Try to return it without borrowing first
      }).toThrow("Book was not borrowed.");
    });
  });
});
