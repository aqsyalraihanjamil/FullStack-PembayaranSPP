import axios from 'axios'
import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import { base_url } from "../Config"
import SppList from "../components/SppList"
import $ from "jquery"

export default class Spp extends Component {
  constructor() {
    super()
    this.state = {
      spp: [],
      token: "",
      action: "",
      tahun: "",
      nominal: 0,
      id_spp: 0,
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

  getSpp = () => {
    let url = base_url + "/spp"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ spp: response.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            this.props.history.push = "/login"
          }
        } else {
          console.log(error)
        }
      })
  }

  componentDidMount() {
    this.getSpp()
  }

  Add = () => {
    $("#modal_spp").modal('show')
    this.setState({
      action: 'insert',
      id_spp: 0,
      tahun: "",
      nominal: 0,
    })
  }

  Edit = (selectedItem) => {
    $("#modal_spp").modal('show')
    this.setState({
      action: 'update',
      id_spp: selectedItem.id_spp,
      tahun: selectedItem.tahun,
      nominal: selectedItem.nominal
    })
  }

  saveSpp = (ev) => {
    ev.preventDefault()
    $("#modal_spp").modal("hide")
    let form = {
      id_spp: this.state.id_spp,
      tahun: this.state.tahun,
      nominal: this.state.nominal
    }

    let url = base_url + "/spp"
    if(this.state.action === "insert"){
      axios.post(url, form, this.headerConfig())
      .then(response => {
        window.alert(response.data.message)
        this.getSpp()
      })
      .catch(error => console.log(error))
    }else if(this.state.action === 'update'){
      axios.put(url, form, this.headerConfig())
      .then(response => {
        window.alert(response.data.message)
        this.getSpp()
      })
      .catch(error => console.log(error))
    }

  }

  dropSpp = (selectedItem) => {
    if(window.confirm("are you sure will delete this item?")){
      let url = base_url + "/spp/" + selectedItem.id_spp
      axios.delete(url, this.headerConfig())
      .then(response => {
        window.alert (response.data.message)
        this.getSpp()
      })
      .catch(error => console.log(error))
    }
  }

 
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h3 className="text-bold text-info mt-2">Spp List</h3>
          <div className="row">
            {this.state.spp.map((item, index) => (
              <SppList
                key={item.id_spp}
                index={`${index + 1}`}
                tahun={item.tahun}
                nominal={item.nominal}
                onEdit={() => this.Edit(item)}
                onDrop={() => this.dropSpp(item)}
              />
            ))}
          </div>
          <button className="btn btn-success" onClick={() => this.Add()}>
            Add Spp
          </button>
        </div>
        <div className="modal fade" id="modal_spp">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h4>Form Spp</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={ev => this.saveSpp(ev)}>
                    Tahun SPP
                    <input type="text" className="form-control mb-1"
                    value={this.state.tahun}
                    onChange={ev => this.setState({ tahun: ev.target.value })}
                    required />

                    Nominal SPP
                    <input type="number" className="form-control mb-1"
                    value={this.state.nominal}
                    onChange={ev => this.setState({ nominal: ev.target.value })}
                    required />

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
