import React, { Component } from 'react'
import Navbar from '../components/Navbar'

export default class Entri extends Component {
  constructor() {
    super()
    this.state = {
      token: "",
      action: '',
      pembayaran: [],
      id_pembayaran: 0,
      id_petugas: 0,
      nisn: 0,
      bulan_dibayar: '',
      tahun_dibayar: '',
      id_spp: 0,
      jumlah_bayar: 0,
    }

    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
    } else {
      window.location = '/login'
    }
    this.headerConfig.bind(this)
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <form class="form-horizontal" onSubmit = {ev => this.savePembayaran(ev)}>
            <div class="form-group">
              <label class="control-label col-sm-2" for="email">Email:</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Enter email" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2" for="pwd">Password:</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                  <label><input type="checkbox" /> Remember me</label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-success m-1">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
