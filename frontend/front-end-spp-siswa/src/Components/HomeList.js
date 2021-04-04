import React, { Component } from 'react'

export default class HomeList extends Component {
  constructor() {
    super()
    this.state = {
      level: localStorage.getItem("level")
    }
  }

  convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
  }
  render() {
    return (
      <div className="container">
        {/* list */}
        <div className="card col-12 my-1">
          <div className="card-body row">
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Siswa</small>
              <h6>{this.props.nama_siswa}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Tanggal Bayar</small>
              <h6>{this.convertTime(this.props.time)}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Total Bayar</small>
              <h6 className="text-danger">Rp. {this.props.total}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Petugas</small>
              <h6>{this.props.nama_petugas}</h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
