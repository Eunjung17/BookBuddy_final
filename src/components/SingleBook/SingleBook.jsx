import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetSingleBookQuery } from '../../redux/slices/singleBookSlice';
import './singleBooksStyles.css'

export default function SingleBook() {
  const { id } = useParams();
  
  // Fetching book details using the ID from the URL
  const { data, error, isLoading } = useGetSingleBookQuery(id);
  console.log("data: ", data);
  const singleBook = data?.book;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No book found</div>;
  }

  return (
    <>
    
    <div>
        <table className="table">
          {/* <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
              <th scope="row"># ID</th>
              <td>{singleBook.id}</td>
            </tr>
            <tr >
              <th scope="row">TITLE</th>
              <td className = "singleBookTitle">
                <h5>{singleBook.title} &nbsp; </h5>
                <Link to={`/checkout/${id}`}>
                  <button>Checkout</button>
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">AUTHOR</th>
              <td>{singleBook.author}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>{singleBook.description }</td>
            </tr>
            <tr>
              <th scope="row">Cover Image</th>
              <td> <img className = "bookCoverSize" src={singleBook.coverimage} alt={singleBook.name} /></td>
            </tr>
            <tr>
              <th scope="row">Available</th>
              <td>{singleBook.available === "false" ? "NO": "Yes"}</td>
            </tr>
          </tbody>
        </table>
    </div>
    </>
  );
}