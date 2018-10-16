import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookList from './components/BookList';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  handleBookshelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        this.searchBooks(this.state.query);
      })
      .catch(console.error);
  }

  handleQueryChange = async (query) => {
    await this.setState(() => ({
      query
    }));

    this.searchBooks(this.state.query);
  }

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
      .then(books => {
        this.setState(() => ({
          books
        }));
      })
      .catch(console.error);
    } else {
      this.setState(() => ({
        books: []
      }));
    }
  }

  componentDidMount() {
    const { query } = this.state;

    this.searchBooks(query);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.handleQueryChange(e.target.value)}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList
              books={this.state.books}
              onShelfChange={this.handleBookshelfChange}
            />
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
