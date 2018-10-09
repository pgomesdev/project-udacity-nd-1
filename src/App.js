import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookList from './BookList';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        console.log(books);

        this.setState(() => ({
          books
        }))
      })
      .catch(err => {
        console.error('An error, ocurred ', err);
      });
  };

  handleBookshelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        this.getBooks();
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onShelfChange={this.handleBookshelfChange}
          />
        )} />
        <Route path="/search" render={() => (
          <Search />
        )} />
      </div>
    );
  }
}

export default BooksApp
