"use strict";

const firebase = require("../db");
const Account = require("../models/main");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const firestore = firebase.firestore();
var md5 = require("md5");

dotenv.config();

const getNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notification = await firestore.collection("subscribes").doc(id).get();
    if (notification.exists) {
      const time = notification.data().time;
      const date = Date(time.seconds * 1000);

      return res.status(200).send(Date("dd/mm/yyyy hh:mm:ss"));
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getNotification,
};
