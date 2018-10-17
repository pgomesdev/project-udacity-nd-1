import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

class Book extends Component {
  state = {
    shelf: ''
  }

  componentDidMount() {
    if (!this.props.book.shelf) {
      BooksAPI.get(this.props.book.id)
        .then(book => {
          this.setState(() => ({
            shelf: book.shelf
          }))
        })
        .catch(console.error);
    }
  }
  
  render() {
    const { book, onShelfChange } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select
                onChange={(e) => onShelfChange(book, e.target.value)}
                value={book.shelf || this.state.shelf}
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map((author, index) => (<div key={index} className="book-authors">${author}</div>))}
        </div>
      </li>
    );
  }
}

// const Book = function bookComponent({ book, onShelfChange }) {
//   return (
//     <li>
//       <div className="book">
//         <div className="book-top">
//           <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}></div>
//           <div className="book-shelf-changer">
//             <select
//               onChange={(e) => onShelfChange(book, e.target.value)}
//               value={book.shelf || 'none'}
//             >
//               <option value="move" disabled>Move to...</option>
//               <option value="currentlyReading">Currently Reading</option>
//               <option value="wantToRead">Want to Read</option>
//               <option value="read">Read</option>
//               <option value="none">None</option>
//             </select>
//           </div>
//         </div>
//         <div className="book-title">{book.title}</div>
//         {book.authors && book.authors.map((author, index) => (<div key={index} className="book-authors">${author}</div>))}
//       </div>
//     </li>
//   );
// };

Book.propTypes ={
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Book;