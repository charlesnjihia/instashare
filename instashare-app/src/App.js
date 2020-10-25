
import {Navbar,Container } from 'react-bootstrap';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import AddFile from './AddFile';
import UpdateFile from './UpdateFile';
import List from './List';


function App() {
  return (
  <div>
    <Header/>
    <AddFile/>
    <List/>

  </div>
);
}

export default App;
