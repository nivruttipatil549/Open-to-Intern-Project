const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")
const internModel = require("../models/internModel")

//const validation = function(data){
  //  if(typeof(values) === "undefined" || data == null){ return false}
//}


// const createCollege = async (req,res)=>{
//  try  { const data = req.body
//     if(Object.keys(data)==0){ return res.status(400).send({staus :false , msg : "Input the data "})}
//     const savedData = await collegeModel.create(data)
//     return res.status(200).send({status : true , msg : savedata})}
//     catch(error){
//         return res.status(500).send({status :false, msg : error})
//     }
// }



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
  const saveData = await collegeModel.findOne({name :college})//.select({collegeId :1})
  const {name ,fullname,logolink, interests } = saveData
  
  const data = await internModel.find({collegeId:saveData})//.populate("collegeId")
   interests.push( data )
    const Data = {name, fullname, logolink,interests }

  return res.status(200).send({status:true , msg:Data})
}
catch(error){
  return res.status(500).send({status:false,msg :error})
}}
module.exports.getData = getData
module.exports.createCollege = createCollege 