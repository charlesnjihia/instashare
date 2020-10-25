import React from 'react';
import {Navbar,Container} from 'react-bootstrap';
import { useHistory } from "react-router-dom";



function  Header(props) {
  const history = useHistory();


const navigateHome=()=>{
// e.preventDefault();
  let path="/";
  history.push(path);

}
 const navigateToLogin=()=>{
  // e.preventDefault();
   let path="/signin";
   history.push(path);
}
const navigateToMyPage=()=>{
  let path="/mypage";
  history.push(path);

}

const onLogout=()=>{
  let path="/";
  history.push(path);
  props.logout();
}

const isLoggedin = props.loggedin;



  return (
  <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand href="#" onClick={navigateHome}>INSTAshare</Navbar.Brand>
      <Navbar.Toggle />

      {isLoggedin ?(
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a href="#" onClick={navigateToMyPage}>{props.username}</a>
        </Navbar.Text>
        <Navbar.Text>
        &nbsp;  | &nbsp;
        </Navbar.Text>
        <Navbar.Text>
          <a href="#"  onClick={onLogout}>signout</a>
        </Navbar.Text>
          </Navbar.Collapse>
      ):(
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <a href="#"  onClick={navigateToLogin}>Sign In</a>
        </Navbar.Text>
        </Navbar.Collapse>

      )
    }

      </Container>
</Navbar>


);


}
export default Header;
