import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import AddFile from './AddFile';

export default class MyPage extends Component {
   constructor() {
     super();
     this.state={

      hasErrors:false,
      errorMessage:"",
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
            let resp=response.data;
            if(resp.status===200){
              console.log(resp);

              //add the file to the fileList
              let fileDetails=resp.filedetails;
              fileDetails.fileID=fileDetails.fileId;
              this.props.onHandleSentFile(fileDetails);

            }else{

              this.setState({hasErrors:true,errorMessage:"Error occured.Try again!"});
            }
        })
        .catch(error => {
            this.setState({hasErrors:true,errorMessage:"Network error.Try again!"});
        });
     }else{
       this.setState({hasErrors:true,errorMessage:"Select a file to upload!"});


     }


}

render(){

  return (
  <div>
  <br/><br/>
  <AddFile fileTitle={this.state.fileTitle} fileDescription={this.state.fileDescription} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onFileChange={this.onFileChange} onHandleUploadFile={this.onHandleUploadFile} hasErrors={this.state.hasErrors} errorMessage={this.state.errorMessage}/>
  <List fileList={this.props.fileList}/>
  </div>

);
}

}
