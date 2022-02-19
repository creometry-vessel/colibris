import axios from "axios";
import React, { Component } from "react";
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
        <div class="row panel">
          <div class="col-md-2">
            <div class="panel-heading">
              <h3 class="panel-title"> Search by :</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div class="panel-heading">
              <select class="form-control" onChange={(e)=>{this.setState({searchType: e.target.value})}}>
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="email">email</option>
                <option value="phone">Phone Number</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div class="mt-4 mb-3">
            <div class="input-group">
              <input class="form-control" type="text" value={this.state.search} onChange={(e)=>{this.setState({search: e.target.value})}}/>
              <span class="input-group-btn">
                <button class="btn btn-primary" type="button" onClick={this.filter}>
                    <i class="fas fa-search"></i>
                </button>
              </span>
            </div>
            </div>
          </div>
        </div>
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