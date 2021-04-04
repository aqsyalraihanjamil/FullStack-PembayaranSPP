import React, { Component } from 'react'
import { Link } from "react-router-dom"
export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      level: localStorage.getItem("level")
    }
  }
  Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
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
              {/* <li className="nav-item">
                <Link to="/entri" className="nav-link">Entri</Link>
              </li> */}
              {this.state.level === "admin" ? (
                <div id="menu" className="navbar-collapse collapse">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to="/spp" className="nav-link">Spp</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/kelas" className="nav-link">Kelas</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/siswa" className="nav-link">Siswa</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/petugas" className="nav-link">Petugas</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
              <li className="nav-item">
                <Link to="/pembayaran" className="nav-link">Pembayaran</Link>
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
