import React, { Component } from 'react';
class Sidebar extends Component {
    render() { 
        return (
            
      <div id="sidebar-nav" className="sidebar">
      <div className="sidebar-scroll">
        <nav>
          <ul className="nav">
            <li>
              <a href="/#history" className="">
                <i className="fas fa-history"></i><span>History</span>
              </a>
            </li>
            <li>
              <a href="/#users" className="">
              <i className="fas fa-users"></i><span>Users</span>
              </a>
            </li>
            
            <li>
              <a href="/#zone" className="">
              <i className="fa-solid fa-map-location-dot"></i><span>Zone</span>
              </a>
            </li>
            <li>
              <a href="/#configuration" className="">
              <i className="fa-solid fa-gears"></i><span>Config</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
        );
    }
}
 
export default Sidebar;