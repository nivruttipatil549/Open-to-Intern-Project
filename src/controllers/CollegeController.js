const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")
const internModel = require("../models/internModel")



const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { return false }
    if (typeof (value) === "string" && (value).trim().length > 0) { return true }
    }

    
const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "BAD REQUEST NO DATA PROVIDED" })
        const { name, fullname, logolink  } = data
        if (!isValid(name)) { return res.status(400).send({ status: false, msg: " name is required" }) }
        if (!isValid(fullname)) { return res.status(400).send({ status: false, msg: "full name is required" }) }
        if (!isValid(logolink)) { return res.status(400).send({ status: false, msg: "logolink is required" }) }
       
       
       let savedData = await collegeModel.create(data)
       return res.status(201).send({ msg: savedData })
    }
    catch (error) {
        console.log(error)
      return  res.status(500).send({ msg: error.message })


    }
}

const getData = async (req,res)=>{
 try{ const college = req.query.name
  const saveData = await collegeModel.findOne({name :college, isDeleted :false}).select({collegeId :1,name:1,fullname:1,logolink:1})
 // const {name ,fullname,logolink, interests } = saveData
 const {name ,fullname,logolink } = saveData
const interests = [];


  const Intdata = await internModel.find({collegeId:saveData, isDeleted: false}).select({_id :1,name:1,email:1,mobile:1})
   interests.push( ...Intdata )
    const Data = {name, fullname, logolink,interests }
    return res.status(200).send({status:true , msg:Data})
}
catch(error){
  return res.status(500).send({status:false,msg :error})
}}
module.exports.getData = getData
module.exports.createCollege = createCollege 