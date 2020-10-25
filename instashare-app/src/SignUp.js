
import {Container,Form,Button,Alert} from 'react-bootstrap';


function SignUp(props) {
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
  <Form onSubmit={props.handleUserSignup}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={props.onUsernameChange} value={props.username}  required/>

  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={props.onPasswordChange} value={props.password} required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" onChange={props.onPasswordConfirmChange} value={props.passwordConfirm} required/>
  </Form.Group>

  <Button variant="primary" type="submit">
    Sign Up
  </Button>
</Form>

  </Container>

);

}

export default SignUp;
