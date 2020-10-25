import React, { Component } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import List from './List';
import AddFile from './AddFile';

export default class MyPage extends Component {
   constructor() {
     super();
     this.state={
      myfiles:[],
      hasErrors:false,
      fileTitle:"",
      fileDescription:"",
      selectedFile:null,


     }
   }


onTitleChange=(e)=>{
  this.setState({fileTitle:e.target.value});
}
onDescriptionChange=(e)=>{
  this.setState({fileDescription:e.target.value});
}
onFileChange=(e)=>{
 this.setState({selectedFile:e.target.files[0]});

}
onHandleUploadFile=(e)=>{
  e.preventDefault();
  // Create an object of formData
       console.log("upload file");
        const formData = new FormData();

        // Update the formData object
        formData.append(
          "doc",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        formData.append(
          "doc",
          this.state.selectedFile,
          this.state.selectedFile.name
        );
      formData.append('filename',this.state.fileTitle);
      formData.append('filedescription',this.state.fileDescription);
      formData.append('userid',this.props.userId);
      const config = {
       headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post("http://localhost/instashare/public/addfile", formData, config)
          .then(response => {
              console.log(response);
          })
          .catch(error => {
              console.log(error);
          });



}

render(){
  console.log(this.props.userId);
  return (
  <div>
  <br/><br/>
  <AddFile fileTitle={this.state.fileTitle} fileDescription={this.state.fileDescription} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onFileChange={this.onFileChange} onHandleUploadFile={this.onHandleUploadFile} hasErrors={this.state.hasErrors}/>
  <List fileList={this.props.fileList}/>
  </div>

);
}

}
