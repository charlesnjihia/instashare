
import {Container,InputGroup,Form,Button,Spinner,Alert} from 'react-bootstrap';


function Login() {
  return (

  <Container>
  <br/><br/>
  <center>
  <Spinner animation="border" variant="secondary" />
   <Alert  variant="danger"> Invalid</Alert>
  </center>
  <br/><br/>
  <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />

  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>



  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<br/>
<Button variant="success" >New User
</Button>

  </Container>

);

}

export default Login;
