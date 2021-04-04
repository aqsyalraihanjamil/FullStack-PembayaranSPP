const express = require("express")
const models = require("../models/index")
const spp = models.spp
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const md5 = require("md5")

const auth = require("../auth")

app.get("/",auth,async (req,res) => {
    spp.findAll()
        .then(spp => {
            res.json(spp)
        })
        .catch(error => {
            res.json({
                message:error.message
            })
        })
})

app.get("/:id_spp",auth,async (req,res) => {
    spp.findOne({where: {id_spp: req.params.id_spp}})
    .then(spp => {
        res.json(spp)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/",auth, (req,res)=>{
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal,
    }
    spp.create(data)
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
    let param = {id_spp : req.body.id_spp}
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.update(data,{where:param})
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

app.delete("/:id_spp",auth, async (req,res) => {
    try{
        let param = {id_spp: req.params.id_spp}
        let result = await spp.findOne({where: param})
        
        spp.destroy({where:param})
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