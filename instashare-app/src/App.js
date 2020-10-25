import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import AddFile from './AddFile';
import UpdateFile from './UpdateFile';
import List from './List';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';



export default class App extends Component{


  constructor() {
    super();
    this.state = {
      fileList: [],
      loggedin:false,
      username:"",
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

}

  render() {
  return (
 <BrowserRouter>
  <div>
    <Header loggedin={this.state.loggedin} username={this.state.username}/>
    <Route exact path="/" render={ () => <List fileList={this.state.fileList} /> } />
    <Route exact path="/signin" render={ () => <Login  /> } />

  </div>
  </BrowserRouter>
);
}
}
