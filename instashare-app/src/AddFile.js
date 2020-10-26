
import {Container,Form,Button,Alert} from 'react-bootstrap';


function AddFile(props) {
  return (

  <Container>
  <br/><br/>
  <center>
   {props.hasErrors?(
   <Alert  variant="danger"> {props.errorMessage}</Alert>
     ):(<div/>)
    }
  </center>
  <br/><br/>
  <Form onSubmit={props.onHandleUploadFile}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Enter Title" value={props.fileTitle} onChange={props.onTitleChange} required />

  </Form.Group>

  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>File Description</Form.Label>
    <Form.Control as="textarea" rows={3} value={props.fileDescription} onChange={props.onDescriptionChange}  required/>
  </Form.Group>
  <Form.Group>
    <Form.File id="exampleFormControlFile1" label="Select file" onChange={props.onFileChange} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Add File
  </Button>

</Form>
{ props.showMyList ? (
<Button variant="success" type="submit" className="but-float" onClick={props.toggleMyList}> All Files
</Button>
):(
  <Button variant="success" type="submit" className="but-float" onClick={props.toggleMyList}> My Files
  </Button>
)
}

  </Container>

);

}

export default AddFile;
