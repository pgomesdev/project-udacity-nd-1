import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookList = ({ books, onShelfChange }) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        { books.map(book => (
          <Book key={book.id} book={book} onShelfChange={onShelfChange} />
        )) }
      </ol>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookList;