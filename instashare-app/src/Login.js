
import {Container,Form,Button,Alert} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


function Login(props) {
const history = useHistory();

const navigateToSignUp=()=>{
 // e.preventDefault();


  let path="/signup";
  history.push(path);



}



  return (

  <Container>
  <br/><br/>
  <center>
   { props.userInvalid ? (
   <Alert  variant="danger"> {props.errorMessage}</Alert>
    ):(
      <div/>
    )
    }
  </center>
  <br/><br/>
  <Form onSubmit={props.handleUserLogin}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={props.username} onChange={props.onUsernameChange} required/>

  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={props.password} onChange={props.onPasswordChange} required/>
  </Form.Group>



  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<br/>
<Button variant="success" onClick={navigateToSignUp} >New User
</Button>

  </Container>

);

}

export default Login;
