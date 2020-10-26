
import {Container} from 'react-bootstrap';
import ListItem from './ListItem';


 const List=(props)=> {

   const results=props.fileList;
   let fileList = results.map(list=>
    <ListItem userId={props.userId} ownerId={list.userID} title={list.fileName} fileSize={list.fileSize} fileType={list.fileType} description={list.fileDescription} zipUrl={list.zipUrl} key={list.fileID} onUpdate={(e)=>props.onFileUpdate(list.fileID,list)} />
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
