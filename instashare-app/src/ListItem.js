
import {Jumbotron} from 'react-bootstrap';


const ListItem=(props)=> {

  return (

    <Jumbotron>
    <h4>{props.title}</h4>
    <h6>
      {props.description}
    </h6>
    <p className="font-small">File size:{props.fileSize} | File type:{props.fileType}</p>
    <p>
    <a href={props.zipUrl} variant="secondary">Download zip</a>
    </p>
  </Jumbotron>

);

}

export default ListItem;
