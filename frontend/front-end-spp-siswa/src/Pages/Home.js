import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
import {base_url} from "../Config"
import HomeList from "../Components/HomeList"
export default class Pembayaran extends Component {
  constructor(){
    super()
    this.state = {
      token: "",
      pembayaran: []
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

  getPembayaran = (selectedItem) => {
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

  componentDidMount(){
    this.getPembayaran()
  }
  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h3 className="text-bold text-info mt-2">Pembayaran List</h3>
          <div className="row">
            {this.state.pembayaran.map((item, index) => (
              <HomeList
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
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
