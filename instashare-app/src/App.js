import logo from './logo.svg';
import './App.css';
import {Navbar,Container } from 'react-bootstrap';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import AddFile from './AddFile';


function App() {
  return (
  <div>
    <Header/>
    <AddFile/>
  
  </div>
);
}

export default App;
