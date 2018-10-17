import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
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
        if (!books.error) {
          this.setState(() => ({
            books
          }));
        } else {
          this.setState(() => ({
            books: []
          }));
        }
      })
      .catch(err => {
        this.setState(() => ({
          books: []
        }));
      });
    } else {
      this.setState(() => ({
        books: []
      }));
    }
  }

  render() {
    const { query, books } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              debounceTimeout={300}
              placeholder="Search by title or author"
              onChange={e => this.handleQueryChange(e.target.value)}
              value={query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookList
              books={books}
              onShelfChange={this.handleBookshelfChange}
            />
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
