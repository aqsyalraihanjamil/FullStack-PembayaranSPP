const express = require("express")
const models = require("../models/index")
const kelas = models.kelas
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const auth = require("../auth")

app.get("/",auth,async (req,res) => {
    kelas.findAll()
        .then(kelas => {
            res.json(kelas)
        })
        .catch(error => {
            res.json({
                message:error.message
            })
        })
})

app.get("/:id_kelas",auth,async (req,res) => {
    kelas.findOne({where: {id_kelas: req.params.id_kelas}})
    .then(kelas => {
        res.json(kelas)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/",auth, (req,res)=>{
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian,
    }
    kelas.create(data)
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
    let param = {id_kelas : req.body.id_kelas}
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.update(data,{where:param})
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

app.delete("/:id_kelas",auth, async (req,res) => {
    try{
        let param = {id_kelas: req.params.id_kelas}
        let result = await kelas.findOne({where: param})
        
        kelas.destroy({where:param})
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