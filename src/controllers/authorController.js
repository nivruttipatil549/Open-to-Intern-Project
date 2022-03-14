const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.status(201).send({msg: savedData})
    }
    catch(error){
        console.log(error)
        res.status(500).send({ msg: error.message })
    

    }
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createAuthor= createAuthor
module.exports.getUsersData= getUsersData