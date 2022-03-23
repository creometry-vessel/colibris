import axios from "axios";
import React, { Component } from "react";
import Search from "./search.component";
class Users extends Component {
  constructor(){
    super();
    this.state = {
      users:[],
      filter:[],
      searchType:"name",
      search:""
    }
    this.getUsers()
    this.getUsers = this.getUsers.bind(this);
    this.filter = this.filter.bind(this);
  }
  getUsers(){
    axios.get(window.ENV.USER_SERVICE_URI).then(res=>{
      this.setState({
        users: res.data,
        filter: res.data
      })
    })
  }
  filter(){
    let tempArr = this.state.users.filter((user)=> user.name == this.state.search);
    this.setState({ filter: tempArr})
  }
  render() {
    return (
      <div>
        <h3 class="page-title">Colibris' users</h3>
        <Search />
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filter.map((user, index)=>(
                <tr>
                  <td>{index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone1}</td>
                  <td>{user.address?.city}</td>
                </tr>
              ))
            }
            <tr>
              <td>1</td>
              <td>Steve</td>
              <td>steve@gmail.com</td>
              <td>55222366</td>
              <td>Mourouj</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Simon</td>
              <td>simon@hotmail.fr</td>
              <td>20114118</td>
              <td>Mansoura</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;