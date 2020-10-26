import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import List from './List';
import MyPage from './MyPage';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';



 class App extends Component{


  constructor() {
    super();
    this.state = {
      fileList: [],
      loggedin:false,
      username:"",
      password:"",
      passwordConfirm:"",
      userId:0,
      userInvalid:false,
      errorMessage:"",

    };
  }
  componentDidMount() {
    this.fetchAllFiles();

  }
fetchAllFiles=()=>{
  axios.get(`http://localhost/instashare/public/getallfiles`)
     .then(response => {

       this.setState({
         fileList: response.data.data
       });
     })
     .catch(error => {
       console.log('Error fetching and parsing data', error);
     });

}//function to logout user
logout=()=>{
this.setState({
loggedin:false,
username:""
});
}
//function to update inputUsername
onUsernameChange=(e)=>{
  this.setState({username:e.target.value});
}
//function to update input password
onPasswordChange=(e)=>{
  this.setState({password:e.target.value});
}
//function to update input passwordConfirm
onPasswordConfirmChange=(e)=>{
  this.setState({passwordConfirm:e.target.value});
}


//function to handle user login
handleUserLogin=(e)=>{
  e.preventDefault();
  //send the login details here
  console.log("submit done");
  //this.setState({userInvalid:true});
  let userDetails={
    username:this.state.username,
    password:this.state.password
  }
  axios.post('http://localhost/instashare/public/loginuser', userDetails)
  .then(response=>{
    let resp=response.data;



    if(resp.status==200){
      let user=response.data.userDetails;
      this.setState({username:user.username,userId:user.userid,loggedin:true});
  }else{
      this.setState({userInvalid:true,errorMessage:"Invalid username or password.Try again!"});
    }

  })
  .catch(error => {
    this.setState({userInvalid:true,errorMessage:"Network error experienced.Try again!"});
    console.log(error);
  });

}

//function to handle user login
handleUserSignup=(e)=>{
  e.preventDefault();
  //send the login details here
  console.log("submit done");
  //this.setState({userInvalid:true});
  let userDetails={
    username:this.state.username,
    password:this.state.password,
    passWordConfirm:this.state.passwordConfirm
  }
  if(userDetails.password == userDetails.passWordConfirm){


  axios.post('http://localhost/instashare/public/adduser', userDetails)
  .then(response=>{
    let resp=response.data;
    console.log(response);


    if(resp.status==200){
    this.setState({userId:resp.userid,loggedin:true});
  }else{
      this.setState({userInvalid:true,errorMessage:"A user with a similar username exists.Try a different username!"});
    }


  })
  .catch(error => {
    this.setState({userInvalid:true,errorMessage:"Network error experienced.Try again!"});

  });
}else{

    this.setState({userInvalid:true,errorMessage:"Password Mismatch.Please provide same password!"});
}




}
onHandleSentFile=(savedFile)=>{
  this.setState({fileList:[savedFile,...this.state.fileList]});
}
onHandleUpdatedFile=(updateFile)=>{
  




}


  render() {

  return (
 <BrowserRouter>
  <div>
    <Header loggedin={this.state.loggedin} username={this.state.username} logout={this.logout}/>
    {this.state.loggedin ? (
     <MyPage  userId={this.state.userId}fileList={this.state.fileList} onHandleSentFile={this.onHandleSentFile} onHandleUpdatedFile={this.onHandleUpdatedFile} />
     ) :(
    <div>
    <Route exact path="/" render={ () => <List fileList={this.state.fileList} />}/>
    <Route  path="/signin" render={ () => <Login errorMessage={this.state.errorMessage} userInvalid={this.state.userInvalid} username={this.state.username} password={this.state.password} onUsernameChange={this.onUsernameChange} onPasswordChange={this.onPasswordChange} handleUserLogin={this.handleUserLogin} /> } />
    <Route  path="/signup" render={ () => <SignUp errorMessage={this.state.errorMessage} userInvalid={this.state.userInvalid} username={this.state.username} password={this.state.password} passwordConfirm={this.state.passwordConfirm} onUsernameChange={this.onUsernameChange} onPasswordChange={this.onPasswordChange} onPasswordConfirmChange={this.onPasswordConfirmChange} handleUserSignup={this.handleUserSignup}/> } />
    </div>
  )
}

  </div>
  </BrowserRouter>
);
}
}
export default App;
