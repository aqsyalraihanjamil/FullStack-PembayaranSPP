import React, { Component } from 'react'

export default class KelasList extends Component {
  render() {
    return (
        <div className="card col-sm-12 my-1">
          <div className="card-body row">
            <div className="col-lg-1 col-sm-12 text-center">
              <small className="text-info">Nomor</small>
              <h6>{this.props.index}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Nama Kelas</small>
              <h6>{this.props.nama_kelas}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <small className="text-info">Kompetensi Keahlian</small>
              <h6>{this.props.kompetensi_keahlian}</h6>
            </div>
            <div className="col-lg-2 col-sm-12">
              <button className='btn btn-sm btn-primary m-1' onClick={this.props.onEdit}> Edit </button>
              <button className="btn btn-sm btn-danger m-1" onClick={this.props.onDrop}> Delete </button>
            </div>
          </div>
        </div>
    )
  }
}
