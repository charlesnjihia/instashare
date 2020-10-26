import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import AddFile from './AddFile';
import UpdateFile from './UpdateFile';

export default class MyPage extends Component {
   constructor() {
     super();
     this.state={

      hasErrors:false,
      errorMessage:"",
      fileTitle:"",
      fileDescription:"",
      newFileStatus:true,
      selectedFile:null,
      showMyList:true,
      updatingFile:false,
      fileToUpdate:null


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


      const config = {
       headers: { 'content-type': 'multipart/form-data' }
        }
      axios.post("http://localhost/instashare/public/addfile", formData, config)
        .then(response => {
            let resp=response.data;
            if(resp.status===200){

              //add the file to the fileList
              let fileDetails=resp.filedetails;
              fileDetails.fileID=fileDetails.fileId;
              this.props.onHandleSentFile(fileDetails);
              this.setState({hasErrors:false});

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
toggleMyList=(e)=>{
this.setState({showMyList:!this.state.showMyList});

}
onFileUpdate=(fileId,fileItem)=>{

  this.setState({fileToUpdate:fileItem,updatingFile:true,fileTitle:fileItem.fileName,fileDescription:fileItem.fileDescription});
  let fileStatus=fileItem.fileStatus;
  if(fileStatus==1){
      this.setState({newFileStatus:true});
  }
}
onFileStatusChange=(e)=>{
  console.log(e.target.value);
  this.setState({newFileStatus:!this.state.newFileStatus});
}


onHandleUpdateFile=(e)=>{
    e.preventDefault();
  // Create an object of formData

        const formData = new FormData();


      formData.append('filename',this.state.fileTitle);
      formData.append('filedescription',this.state.fileDescription);
      formData.append('userid',this.props.userId);
      formData.append('fileid',this.state.fileToUpdate.fileID);

      if(this.state.newFileStatus){
        formData.append('filestatus',1);
      }else{
        formData.append('filestatus',0);
      }

      if(this.state.selectedFile!=null){
        formData.append(
            "doc",
            this.state.selectedFile,
            this.state.selectedFile.name
          );

      }

      const config = {
       headers: { 'content-type': 'multipart/form-data' }
        }
      axios.post("http://localhost/instashare/public/updatefile", formData, config)
        .then(response => {
          console.log(response);
            let resp=response.data;
            if(resp.status===200){

              //add the file to the fileList
              let fileDetails=resp.filedetails;
              fileDetails.fileID=fileDetails.fileId;
              this.props.onHandleSentFile(fileDetails);
              this.setState({hasErrors:false});

            }else{

              this.setState({hasErrors:true,errorMessage:"Error occured.Try again!"});
            }
        })
        .catch(error => {
            this.setState({hasErrors:true,errorMessage:"Network error.Try again!"});
        });



}

render(){
  const userId=this.props.userId;
  let fileList=[];
  if(this.state.showMyList){
    fileList=this.props.fileList.filter(list=>list.userID==userId);
  }else{
    fileList=this.props.fileList;
  }




  return (
    <div>
  { !this.state.updatingFile ? (
  <div>
  <AddFile fileTitle={this.state.fileTitle} fileDescription={this.state.fileDescription} onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onFileChange={this.onFileChange} onHandleUploadFile={this.onHandleUploadFile} hasErrors={this.state.hasErrors} errorMessage={this.state.errorMessage} toggleMyList={this.toggleMyList} showMyList={this.state.showMyList}/>
  <List fileList={fileList} userId={this.props.userId} onFileUpdate={this.onFileUpdate}/>
  </div>
):(
  <UpdateFile fileTitle={this.state.fileTitle}fileDescription={this.state.fileDescription} fileStatus={this.state.newFileStatus} onFileStatusChange={this.onFileStatusChange}  onTitleChange={this.onTitleChange} onDescriptionChange={this.onDescriptionChange} onFileChange={this.onFileChange} onHandleUpdateFile={this.onHandleUpdateFile} hasErrors={this.state.hasErrors} errorMessage={this.state.errorMessage}/>

)}
</div>
);
}

}
