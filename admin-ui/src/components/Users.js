import axios from "axios";
import React, { Component } from "react";
import Search from "./search.component";
let filters = [
  {id: "", key: "----"},
  {id: "username", key: "username", type: "input"},
  {id: "email", key: "email", type: "input"},
  {id: "phone", key: "phone", type: "input"},
]
class Users extends Component {
  constructor(){
    super();
    this.state = {
      users:[]
    }
    this.getUsers()
    this.getUsers = this.getUsers.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  getUsers(){
    axios.get(window.ENV.USER_SERVICE_URI).then(res=>{
      this.setState({
        users: res.data,
      })
    })
  }
  Submit(filter , search){
    console.log(`${window.ENV.USER_SERVICE_URI}?${filter}=${search}`)
    axios.get(`${window.ENV.USER_SERVICE_URI}?${filter}=${search}`).then(res=>{
      this.setState({
        users: res.data,
      })
    })
  }
  render() {
    return (
      <div>
        <h3 class="page-title">Colibris' users</h3>
        <Search filters={filters} Submit={this.Submit} />
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((user, index)=>(
                <tr>
                  <td>{index}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone1}, {user.phone2}</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;