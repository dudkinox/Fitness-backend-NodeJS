"use strict";

const firebase = require("../db");
const Account = require("../models/main");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const firestore = firebase.firestore();
var md5 = require("md5");

dotenv.config();

const getClass = async (req, res, next) => {
  try {
    const classfitness = await firestore
      .collection("classfitness")
      .where("amount", "==", 0);
    const fetchClassfitness = await classfitness.get();
    if (fetchClassfitness.empty) {
      return res.status(404).send("ไม่มีคลาส");
    }
    var arrayClass = [];
    fetchClassfitness.forEach((doc) => {
      arrayClass.push(doc.data());
    });

    return res.status(200).send(arrayClass);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getClass,
};
