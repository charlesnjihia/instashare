
import {Container,InputGroup,Form,Button,Spinner,Alert} from 'react-bootstrap';


function UpdateFile() {
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
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Enter Title" />

  </Form.Group>

  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>File Description</Form.Label>
    <Form.Control as="textarea" rows={3} />
  </Form.Group>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Select file" />
  </Form.Group>
  <div  className="mb-3">
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Active"
        checked="true"
      />
  </div>


  <Button variant="primary" type="submit">
    Update File
  </Button>
</Form>

  </Container>

);

}

export default UpdateFile;
