import { useGetReservationsQuery, useDeleteReservationMutation } from "../../redux/slices/reservationsSlice"
import { Link } from 'react-router-dom';
import './reservationsStyles.css'


const Reservations = ({token, setToken, setChangeFlag}) => {

    const { data, isLoading } = useGetReservationsQuery(token);
    
    const reservation = data?.reservation;
    let sortedBookList = reservation ? [...reservation].sort((a, b) => a.id - b.id) : [];

    const [deleteInfo] = useDeleteReservationMutation();

    const deleteBook = async (event) => {

        try {
            const reservationId = event.target.value;

            if(token){
    
                const value = {token, reservationId};
                await deleteInfo(value).unwrap();
                setChangeFlag("delete");
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <>
            <div className = "table_width">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col"># ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Cover Image</th>
                        <th scope="col">Author</th>
                        <th scope="col">Description</th>
                        <th scope="col">Checkout Status</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {isLoading && <tr><td colSpan="6">Loading Books...</td></tr>}
                    {!isLoading && sortedBookList ? (
                        sortedBookList.map((p) => (
                        <tr key={p.id}>
                            <th scope="row">{p.id}</th>
                            <td><h5>{p.title}</h5></td>
                            <td> <img className = "bookCoverSize" src={p.coverimage} alt={p.name} /></td>
                            <td><h6>{p.author}</h6></td>
                            <td>{p.description}</td>
                            <td>
                                <br/>CheckOut<br/><br/><button value={p.id} onClick={deleteBook}>Return book</button>
                            </td>
                        </tr>
                            ))
                            ) : (
                            <tr><td colSpan="6">There is no book.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>  
        </>
    );
};

export default Reservations;