import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import AddFile from './AddFile';

export default class MyPage extends Component {
   constructor() {
     super();
     this.state={
      myfiles:[],
      hasErrors:false,
      errorMessage:"",
      fileTitle:"",
      fileDescription:"",
      selectedFile:null,


     }
   }


onTitleChange=(e)=>{
  this.setState({fileTitle:e.target.value});
  console.log(this.state);

}
onDescriptionChange=(e)=>{
  this.setState({fileDescription:e.target.value});
  console.log(this.state);
}
onFileChange=(e)=>{
 this.setState({selectedFile:e.target.files[0]});
 console.log(this.state);

}
onHandleUploadFile=(e)=>{
  e.preventDefault();


  if(this.state.selectedFile!=null){
  // Create an object of formData
      // console.log(this.state);
        const formData = new FormData();

        // Update the formData object

      formData.append(
        "doc",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      formData.append('filename',this.state.fileTitle);
      formData.append('filedescription',this.state.fileDescription);
      formData.append('userid',this.props.userId);
      console.log('title',this.state.fileTitle);
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
     }else{
       this.setState({selectedFile:e.target.files[0]});


     }


}

render(){
  console.log(this.props.userId);
  return (
  <div>
  <br/><br/>
  <AddFile fileTitle={this.state.fileTitle} fileDescription={this.state.fileDescription} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onFileChange={this.onFileChange} onHandleUploadFile={this.onHandleUploadFile} hasErrors={this.state.hasErrors} errorMessage={this.state.errorMessage}/>
  <List fileList={this.props.fileList}/>
  </div>

);
}

}
