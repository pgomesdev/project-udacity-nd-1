import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import Search from './Search';
import './App.css';

class BooksApp extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <BookShelf />
        )} />
        <Route path="/search" render={() => (
          <Search />
        )} />
      </div>
    );
  }
}

export default BooksApp
