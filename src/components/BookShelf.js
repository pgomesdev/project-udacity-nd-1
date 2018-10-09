import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  render() {
    const { books, onShelfChange } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { books.map(book => (
            <Book key={book.id} book={book} onShelfChange={onShelfChange} />
          )) }
        </ol>
      </div>
    );
  }
}

export default BookShelf;