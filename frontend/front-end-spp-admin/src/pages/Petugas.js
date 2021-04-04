import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import $ from "jquery"
import { base_url } from "../Config"
import axios from 'axios'
export default class Petugas extends Component {
  constructor() {
    super()
    this.state = {
      petugas: [],
      token: '',
      action: '',
      id_petugas: 0,
      username: '',
      password: '',
      nama_petugas: '',
      level: '',
      fillPassword: true,
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

  getPetugas = () => {
    let url = base_url + "/petugas"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ petugas: response.data })
      })

      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert = error.response.data.message
            this.props.history.push("/login")
          }
        } else {
          console.log(error)
        }
      })
  }

  componentDidMount() {
    this.getPetugas()
  }

  Add = () => {
    $("#modal_petugas").modal('show')
    this.setState({
      action: 'insert',
      id_petugas: 0,
      nama_petugas: '',
      username: '',
      password: '',
      level: '',
      fillPassword: true,
    })
  }

  Edit = (selectedItem) => {
    $('#modal_petugas').modal('show')
    this.setState ({
      action: 'update',
      id_petugas: selectedItem.id_petugas,
      nama_petugas: selectedItem.nama_petugas,
      username: selectedItem.username,
      password: selectedItem.password,
      level: selectedItem.level,
      fillPassword: false,
    })
  }

  savePetugas = (ev) => {
    ev.preventDefault()
    $("#modal_petugas").modal('hide')
    let form = {
      id_petugas: this.state.id_petugas,
      nama_petugas: this.state.nama_petugas,
      username: this.state.username,
      level: this.state.level
    }
    if(this.state.password){
      form.password = this.state.password
  }
    let url = base_url + "/petugas"
    if (this.state.action === "insert") {
      axios.post(url, form, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getPetugas()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === 'update') {
      axios.put(url, form, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getPetugas()
        })
        .catch(error => console.log(error))
    }
  }
  dropPetugas = (selectedItem) => {
    if(window.confirm("are you sure will delete this item?")){
      let url = base_url + "/petugas/" + selectedItem.id_petugas
      axios.delete(url, this.headerConfig())
      .then(response => {
        window.alert (response.data.message)
        this.getPetugas()
      })
      .catch(error => console.log(error))
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h3 className="text-bold text-info mt-2">Petugas List</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <td>#</td>
                <td>Nama</td>
                <td>Username</td>
                <td>Level</td>
                <td>Option</td>
              </tr>
            </thead>
            <tbody>
              {this.state.petugas.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nama_petugas}</td>
                  <td>{item.username} </td>
                  <td>{item.level}</td>
                  <td>
                    <button className="btn btn-sm btn-info m-1"
                      onClick={() => this.Edit(item)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger m-1"
                      onClick={() => this.dropPetugas(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success"
            onClick={() => this.Add()}>
            Tambah Petugas
              </button>
          {/* Modal Petugas */}
          <div className="modal fade" id="modal_petugas">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-info text-white">
                  <h4>Form Petugas</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={ev => this.savePetugas(ev)}>
                    Nama
                    <input type="text" className="form-control mb-1"
                      value={this.state.nama_petugas}
                      onChange={ev => this.setState({ nama_petugas: ev.target.value })}
                    />
                    Username
                    <input type="text" className="form-control mb-1"
                      value={this.state.username}
                      onChange={ev => this.setState({ username: ev.target.value })}
                    />
                    Level
                    <select class="form-control" onChange={ev => this.setState({level: ev.target.value})}>
                      <option selected="selected">Pilih level</option>
                      <option value="admin">Admin</option>
                      <option value="petugas">Petugas</option>
                    </select>
                        {this.state.action === "update" && this.state.fillPassword === false ? (
                          <button className="btn btn-sm btn-secondary mb-1 btn-block"
                            onClick={() => this.setState({ fillPassword: true })}>
                            Change Password
                          </button>
                        ) : (
                          <div>
                            Password
                            <input type="password" className="form-control mb-1"
                              value={this.state.password}
                              onChange={ev => this.setState({ password: ev.target.value })}
                              required />
                          </div>
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
          </div>
    )
  }
}
