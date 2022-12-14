

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from 'react-router-dom';
import Home from './Home';
import Login from './Auth';
import Intervention from './Intervention';


function App() {
  

  return (
      <Router>
      <div className="App">
     {/* <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">About Us</Link>
      </li>
      <li>
        <Link to="/intervention">Contact Us</Link>
      </li>
    </ul> */}
    <Routes>
    <Route exact path='/' element={< Home />}></Route>
    <Route exact path='/login' element={< Login />}></Route>
    <Route exact path='/intervention' element={< Intervention />}></Route>
</Routes>
</div>
      </Router>
       
  );
}
export default App