const express = require("express")
const models = require("../models/index")
const petugas = models.petugas
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeSPP"

app.get("/",auth,async (req,res) => {
petugas.findAll()
        .then(petugas => {
            res.json(petugas)
        })
        .catch(error => {
            res.json({
                message:error.message
            })
        })
})

app.get("/:id_petugas",auth,async (req,res) => {
    petugas.findOne({where: {id_petugas: req.params.id_petugas}})
    .then(petugas => {
        res.json(petugas)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/",auth, (req,res)=>{
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.create(data)
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
    let param = {id_petugas : req.body.id_petugas}
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_petugas : req.body.nama_petugas,
        level : req.body.level
    }
    petugas.update(data,{where:param})
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

app.delete("/:id_petugas",auth, async (req,res) => {
    try{
        let param = {id_petugas: req.params.id_petugas}
        let result = await petugas.findOne({where: param})
        
        petugas.destroy({where:param})
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

    let result = await petugas.findOne({where: params})
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