import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navigation/Navigation';
// import Account from './components/Account';
// import Login from './components/Login';
import SingleBook from './components/SingleBook/SingleBook';
import Books from './components/Books/Books';
// import Register from './components/Register';
// import Signup from './components/Signup';
// import { useState } from 'react';
// import bookLogo from './assets/books.png';
import {store} from "./redux/store";
import { Provider } from "react-redux";

function App() {
  // const [token, setToken] = useState(null);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav path="/Nav"/>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/SingleBook/:id" element={<SingleBook />} />
            {/* <Route path="/Account" element={<Account />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Signup" element={<Signup />} /> */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
