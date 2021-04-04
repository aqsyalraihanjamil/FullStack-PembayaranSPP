import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import PembayaranList from '../components/PembayaranList'
import { base_url } from '../Config'
import axios from 'axios'
import $ from "jquery"
export default class Pembayaran extends Component {
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

  getPembayaran = () => {
    let url = base_url + "/pembayaran"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ pembayaran: response.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            this.props.history.push("/login")
          }
        } else {
          console.log(error)
        }
      })
  }

  componentDidMount() {
    this.getPembayaran()
  }

  Add = () => {
    $("#modal_pembayaran").modal('show')
    this.setState({
      action: 'insert',
      id_pembayaran: 0,
      id_petugas: 0,
      nisn: 0,
      bulan_dibayar: '',
      tahun_dibayar: '',
      jumlah_bayar: 0,
      id_spp: 0,

    })
  }

  Edit = (selectedItem) => {
    $("#modal_pembayaran").modal('show')
    this.setState({
      action: 'update',
      id_pembayaran: selectedItem.id_pembayaran,
      id_petugas: selectedItem.id_petugas,
      nisn: selectedItem.nisn,
      bulan_dibayar: selectedItem.bulan_dibayar,
      tahun_dibayar: selectedItem.tahun_dibayar,
      jumlah_bayar: selectedItem.jumlah_bayar,
      id_spp: selectedItem.id_spp
    })
  }

  savePembayaran = (ev) => {
    ev.preventDefault()
    $("#modal_pembayaran").modal("hide")
    let form = {
      id_pembayaran: this.state.id_pembayaran,
      id_petugas: this.state.id_petugas,
      nisn: this.state.nisn,
      bulan_dibayar: this.state.bulan_dibayar,
      tahun_dibayar: this.state.tahun_dibayar,
      jumlah_bayar: this.state.jumlah_bayar,
      id_spp: this.state.id_spp
    }

    let url = base_url + "/pembayaran"
    if(this.state.action === "insert"){
      axios.post(url, form, this.headerConfig())
      .then(response => {
        window.alert(response.data.message)
        this.getPembayaran()
      })
      .catch(error => console.log(error))
    }else if(this.state.action === 'update'){
      axios.put(url, form, this.headerConfig())
      .then(response => {
        window.alert(response.data.message)
        this.getPembayaran()
      })
      .catch(error => console.log(error))
    }
  }

  dropPembayaran = (selectedItem) => {
    if(window.confirm("are you sure will delete this item?")){
      let url = base_url + "/pembayaran/" + selectedItem.id_pembayaran
      axios.delete(url, this.headerConfig())
      .then(response => {
        window.alert (response.data.message)
        this.getPembayaran()
      })
      .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h3 className="text-bold text-info mt-2">Pembayaran List</h3>
          <div className="row">
            {this.state.pembayaran.map((item, index) => (
              <PembayaranList
                key={item.id_pembayaran}
                id_pembayaran = {item.id_pembayaran}
                nama_siswa={item.siswa.nama}
                time={item.tgl_bayar}
                total={item.jumlah_bayar}
                nama_petugas={item.petugas.nama_petugas}
                index={`${index + 1}`}
                id_petugas={item.id_petugas}
                bulan_dibayar={item.bulan_dibayar}
                tahun_dibayar={item.tahun_dibayar}
                id_spp={item.id_spp}
                onEdit={() => this.Edit(item)}
                onDrop={() => this.dropPembayaran(item)}

              />
            ))}
          </div>
          <button className="btn btn-success" onClick={() => this.Add()}>
            Add Pembayaran
          </button>
        </div>
        <div className="modal fade" id="modal_pembayaran">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h4>Form Pembayaran</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={ev => this.savePembayaran(ev)}>
                NISN
                  {this.state.action === "update" ? (
                  <input type="text" className="form-control mb-1"
                  value={this.state.nisn}
                  onChange={ev => this.setState({ nisn: ev.target.value })}
                  disabled />):(
                    <input type="text" className="form-control mb-1"
                  value={this.state.nisn}
                  onChange={ev => this.setState({ nisn: ev.target.value })}
                  required />
                  )}
                  
                  Bulan Dibayar
                  <input type="text" className="form-control mb-1"
                  value={this.state.bulan_dibayar}
                  onChange={ev => this.setState({ bulan_dibayar: ev.target.value })}
                  required />

                  Tahun dibayar
                  <input type="text" className="form-control mb-1"
                  value={this.state.tahun_dibayar}
                  onChange={ev => this.setState({ tahun_dibayar: ev.target.value })}
                  required />
  
                  Total Bayar
                  <input type="number" className="form-control mb-1"
                  value={this.state.jumlah_bayar}
                  onChange={ev => this.setState({ jumlah_bayar: ev.target.value })}
                  required />

                  ID Petugas
                  <input type="text" className="form-control mb-1"
                  value={this.state.id_petugas}
                  onChange={ev => this.setState({ id_petugas: ev.target.value })}
                  required />

                  ID Spp
                  {this.state.action === "update" ? (
                  <input type="text" className="form-control mb-1"
                  value={this.state.id_spp}
                  onChange={ev => this.setState({ id_spp: ev.target.value })}
                  disabled />):(
                    <input type="text" className="form-control mb-1"
                  value={this.state.id_spp}
                  onChange={ev => this.setState({ id_spp: ev.target.value })}
                  required />
                  )}
                  

                  <button type="submit" className="btn btn-block btn-success">
                    Simpan
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
