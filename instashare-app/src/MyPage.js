
import {Container} from 'react-bootstrap';
import ListItem from './ListItem';


 export default class MyPage extends Component {

   const results=props.fileList;
   let fileList = results.map(list=>
    <ListItem title={list.fileName} description={list.fileDescription} zipUrl={list.zipUrl} key={list.fileID} />
  );


render(){
  return (

  <Container>
  <br/><br/>
   {
  fileList


  }

  </Container>

);
}

}

export default List;
