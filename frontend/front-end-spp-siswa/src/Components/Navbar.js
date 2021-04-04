import React, { Component } from 'react'
import { Link } from "react-router-dom"
export default class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("siswa")
    window.location = "/login"
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-expand-lg bg-dark navbar-dark">
          <a className="navbar-brand">Pembayaran SPP</a>
          {/* show and hide menu */}
          <button className="navbar-toggler" data-toggle='collapse' data-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* menu */}
          <div id="menu" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => this.Logout()}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
