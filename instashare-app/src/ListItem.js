
import {Jumbotron} from 'react-bootstrap';


const ListItem=(props)=> {
  
  return (

    <Jumbotron>
    <h4>{props.title}</h4>
    <p>
      {props.description}
    </p>
    <p>
    <a href={props.zipUrl} variant="secondary">Download zip</a>
    </p>
  </Jumbotron>

);

}

export default ListItem;
