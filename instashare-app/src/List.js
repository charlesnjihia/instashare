
import {Container} from 'react-bootstrap';
import ListItem from './ListItem';


 const List=(props)=> {

   const results=props.fileList;
   let fileList = results.map(list=>
    <ListItem title={list.fileName} description={list.fileDescription} zipUrl={list.zipUrl} key={list.fileID} />
  );



  return (

  <Container>
  <br/><br/>
   {
  fileList


  }




  </Container>

);

}

export default List;
