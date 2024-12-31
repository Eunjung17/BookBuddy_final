import './UserStyles.css'
import {useGetSingleUserQuery} from '../../redux/slices/userSlice'


const UserProfile = ({token, setToken}) => {

    const {data, error, isLoading} = useGetSingleUserQuery(token);

    return(
        <>
        {!error && 
            <div className="tableWidth">
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col"><h5>Info.</h5></th>
                        <th scope="col"><h5>Detail</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">User Id</th>
                        <td>{data?.id}</td>
                        </tr>
                        <tr>
                        <th scope="row">First Name</th>
                        <td>{data?.firstname}</td>
                        </tr>
                        <tr>
                        <th scope="row">Last Name</th>
                        <td>{data?.lastname}</td>
                        </tr>
                        <tr>
                        <th scope="row">Email</th>
                        <td>{data?.email}</td>
                        </tr>
                        <tr>
                        <th scope="row">Checkout Book</th>
                        {data?.books.length > 0 ? (
                            <td>
                                <ul>
                                    {data.books.map((book, index)=>(
                                        <li key={index}>[ {book.title} ] by {book.author}</li>
                                    ))}
                                </ul>
                            </td>
                        )
                            : (<td>None</td>)
                        }
                        </tr>
                    </tbody>
                </table> 
            </div>
        }

            {isLoading && <output>Loading...</output>}
            {error && <output>{error.message}</output>}
        </>
    );
}

export default UserProfile;