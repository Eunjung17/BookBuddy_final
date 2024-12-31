import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery, useUpdateBookAvailabilityMutation } from '../../redux/slices/singleBookSlice';
import './singleBooksStyles.css'

export default function SingleBook({token, setToken}) {
  const { id } = useParams();
  
  // Fetching book details using the ID from the URL
  const {data, isLoading, error, refetch} = useGetSingleBookQuery(id);

  const [userFlag, setUserFlag] = useState("");

  const singleBook = data?.book;
  const available = singleBook?.available;

  const [updateInfo] = useUpdateBookAvailabilityMutation();

  const checkOut = async () => {

    if(token){

      const value = {token, id, available};
      await updateInfo(value).unwrap();
      refetch();
    }
  }
  
  const checkLoggedUser = () => {

    if(!token){
      setUserFlag("alertLoginRequire");
    }
  }

  const closeAlert = () => {

    if(!token){
      setUserFlag("");
    }
  }

  return (
    <>
    {data ? 
        <div>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row"># ID</th>
                <td>{singleBook.id}</td>
              </tr>
              <tr >
                <th scope="row">TITLE</th>
                <td className = "singleBookTitle">
                  <div>
                    <div className = "titlePosition">
                      <h5>{singleBook.title} &nbsp; </h5>
                    {token && available===true &&
                      <button onClick={checkOut}>Checkout</button>
                    }
                    {available===false &&
                      <button>Reserved</button>
                    }

                    {!token && available===true &&
                      <button onClick={checkLoggedUser}>Checkout</button> 
                    }
                    </div>
                    <div>
                    {userFlag === "alertLoginRequire" &&
                    <>
                      <div className="alert alert-primary d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                          You should log in or sign up first to checkout.
                          <button onClick={closeAlert} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                      </div>
                    </>
                    }
                    </div>
                  </div>



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
                <td>{singleBook.available === false ? "NO": "Yes"}</td>
              </tr>
            </tbody>
          </table>
      </div>
    : <div>No book found</div>
    }
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}

    </>
  );
}