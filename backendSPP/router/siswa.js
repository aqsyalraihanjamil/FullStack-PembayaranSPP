const express = require("express")
const models = require("../models/index")
const siswa = models.siswa
const spp = models.spp
const kelas = models.kelas
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeSPP"

app.get("/",auth,async (req,res) => {
    
    let result = await siswa.findAll({
        include: [
            "kelas",
            "spp"
        ]
    })
    res.json(result)
})

app.get("/:nisn",auth,async (req,res) => {
    let param = {nisn: req.params.nisn}
    let result = await siswa.findAll({
        where: param,
        include: [
            "kelas",
            "spp"
        ]
    })
    res.json(result)
})

app.post("/",auth, async (req,res)=>{
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
    }
    siswa.create(data)
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
    let param = {nisn : req.body.nisn}
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
    }
    siswa.update(data,{where:param})
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

app.delete("/:nisn",auth, async (req,res) => {
    try{
        let param = {nisn: req.params.nisn}
        let result = await siswa.findOne({where: param})
        
        siswa.destroy({where:param})
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

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await siswa.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})
module.exports = app