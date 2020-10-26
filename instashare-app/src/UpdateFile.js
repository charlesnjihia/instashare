
import {Container,Form,Button,Alert} from 'react-bootstrap';


function UpdateFile(props) {
  return (

  <Container>
  <br/><br/>
  <center>
  {props.hasErrors?(
   <Alert  variant="danger"> {props.errorMessage}</Alert>
   ):(
   <div/>
   )}
  </center>
  <br/><br/>
  <Form onSubmit={props.onHandleUpdateFile}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Enter Title" value={props.fileItem.fileName} onChange={props.onTitleChange}  required/>

  </Form.Group>

  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>File Description</Form.Label>
    <Form.Control as="textarea" rows={3} value={props.fileItem.fileDescription} onChange={props.onDescriptionChange} required/>
  </Form.Group>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Select file" onChange={props.onFileChange}/>
  </Form.Group>
  <div  className="mb-3">
      <Form.Check
        type="checkbox"
        id="default-checkbox"
        label="Active"
        checked={props.fileItem.fileStatus}
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
