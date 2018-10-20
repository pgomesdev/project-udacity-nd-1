import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './components/BookList';
import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {
  state = {
    books: []
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }))
      })
      .catch(err => {
        console.error('An error, ocurred ', err);
      });
  };

  handleBookshelfChange = (book, shelf) => {
    const { books } = this.state;
    
    BooksAPI.update(book, shelf)
      .then(response => {
        // Locate the id to update the current shelf in the shelf page
        const bookPos = books.findIndex(b => b.id === book.id);

        books[bookPos].shelf = shelf;

        this.setState(() => ({
          books
        }));
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookList
                books={books.filter(book => book.shelf === 'currentlyReading')}
                onShelfChange={this.handleBookshelfChange}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookList
                books={books.filter(book => book.shelf === 'wantToRead')}
                onShelfChange={this.handleBookshelfChange}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookList
                books={books.filter(book => book.shelf === 'read')}
                onShelfChange={this.handleBookshelfChange}
              />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelf;

