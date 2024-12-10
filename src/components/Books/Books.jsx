import { useState, useEffect } from "react";
import { useGetBooksQuery } from "../../redux/slices/booksSlice"
import { Link } from 'react-router-dom';
import './BooksStyles.css'


const Books = () => {
  const { data: books, isLoading, isSuccess } = useGetBooksQuery();
  
  console.log("books, isLoading, isSuccess: ", books, isLoading, isSuccess);
  const bookList = books?.books;
  let sortedBookList = bookList ? [...bookList].sort((a, b) => a.id - b.id) : [];

  const [option, setOption] = useState("");
  const [searchWord, setSearchWord] = useState("");


  const searchResult = sortedBookList.filter((p)=>{
    if(searchWord && option === "id"){
      return p.id.toString() === (searchWord);
    }else if(searchWord && option === "title"){
      return p.title.toLowerCase().includes(searchWord.toLowerCase());
    }else return true;
  });

  return (
    <>

        <div className="search-container">
        {/* <form action="/action_page.php"> */}
        <input type="text" placeholder="Search.." name="search" onChange={(e) => setSearchWord(e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className="status">
        <select  name="status" value={option} onChange={(e) => setOption(e.target.value)}>
            <option value="choice">Choose Option</option>
            <option value="title">Title</option>
            <option value="id">Id</option>
        </select>
        </div>
        {/* </form> */}
        </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col"># ID</th>
                <th scope="col">TITLE</th>
                <th scope="col">Cover Image</th>
                <th scope="col">AUTHOR</th>
                {/* <th className="description" scope="col">Description</th> */}
                <th scope="col">Available</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {isLoading && <tr><td colSpan="6">Loading Books...</td></tr>}
              {!isLoading && searchResult ? (
                searchResult.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">{p.id}</th>
                    <td><h5><Link to={`/SingleBook/${p.id}`}>{p.title}</Link></h5></td>
                    <td> <img className = "bookCoverSize" src={p.coverimage} alt={p.name} /></td>
                    <td><h6>{p.author}</h6></td>
                    {/* <td>{p.description}</td> */}
                    <td>{p.available === "false" ? "NO": "Yes"}</td>
                  </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6">There is no book.</td></tr>
                )}
            </tbody>
          </table>
    </>
  );
};

export default Books;