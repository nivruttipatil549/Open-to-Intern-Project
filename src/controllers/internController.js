const internModel = require("../models/internModel");
const mongoose = require("mongoose");

const validation = function (value) {
  if (typeof value === undefined || typeof value === null) {return false;}
  if (typeof value === "string" && value.trim().length > 0) {return true;}};


const createIntern = async (req, res) => {
  try {
    const data = req.body;
    if (Object.keys(data) == 0) {
      return res.status(400).send({ staus: false, msg: "Input the data " });   }
      const { name, email, mobile, collegeId } = data;

      

    if (!validation(email)) { return res.status(400).send({ status: false, msg: "email is required" });}
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).send({ status: false, message: "email will be valid email address " });}



    if (!validation(mobile)) {return res.status(400).send({ status: false, msg: "mobile is required" });}
    if (!/^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(mobile)) {
      return res.status(400).send({ status: false, message: "mobile will be valid number " });}



    if (!validation(name)) {return res.status(400).send({ status: false, msg: "Name is required" });}
    if (!validation(collegeId)) {return res.status(400).send({ status: false, msg: "collegeId is required" });}



    const SavedData = await internModel.create(data);
    return res.status(201).send({ status: true, msg: SavedData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error });
  }
};
module.exports.createIntern = createIntern;
