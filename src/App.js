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

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
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
