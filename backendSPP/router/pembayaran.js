const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const siswa = models.siswa
const spp = models.spp
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeSPP"

app.get("/",auth,async (req,res) => {
    let result = await pembayaran.findAll({
        include: [
            "petugas",
            "siswa",
            {
                model: siswa,
                as: "siswa",
                include: ["spp"]
            }
        ]
    })
    res.json(result)
})

app.get("/:id_pembayaran",auth,async (req,res) => {
    let param = {id_pembayaran: req.params.id_pembayaran}
    let result = await pembayaran.findAll({
        where: param,
        include: [
            "petugas",
            "siswa",
            {
                model: siswa,
                as: "siswa",
                include: ["spp"]
            }
        ]
    })
    res.json(result)
})

app.get("/:nisn",auth,async (req,res) => {
  let param = {nisn: req.params.nisn}
  let result = await pembayaran.findAll({
      where: param,
      include: [
          "petugas",
          "siswa",
          {
              model: siswa,
              as: "siswa",
              include: ["spp"]
          }
      ]
  })
  res.json(result)
})

app.post("/",auth, (req,res)=>{
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar,
    }
    pembayaran.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message:error.message
        })
    })
})

app.put("/",auth, async(req,res) => {
    let param = {id_pembayaran : req.body.id_pembayaran}
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar,
    }
    pembayaran.update(data,{where:param})
    .then(result => {
        res.json({
            message: "data has been updated",
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_pembayaran",auth, async (req,res) => {
    try{
        let param = {id_pembayaran: req.params.id_pembayaran}
        let result = await pembayaran.findOne({where: param})
        
        pembayaran.destroy({where:param})
        .then(result => {
            res.json({
                message: "data has been deleted",
                
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }catch(error){
        res.json({
            message: error.message
        })
    }
})
module.exports = app