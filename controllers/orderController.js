"use strict";

const firebase = require("../db");
const Account = require("../models/main");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const firestore = firebase.firestore();
var md5 = require("md5");

dotenv.config();

const getAllOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subscribes = await firestore
      .collection("subscribes")
      .where("iduser", "==", id)
      .where("status", "==", "จอง");
    const fetchSubscribes = await subscribes.get();
    if (fetchSubscribes.empty) {
      return res.status(404).send("ไม่มีออเดอร์");
    }
    return res.status(200).send(fetchSubscribes.docs[0].data());
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const getAllHistory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subscribes = await firestore
      .collection("subscribes")
      .where("iduser", "==", id);
    const fetchSubscribes = await subscribes.get();
    if (fetchSubscribes.empty) {
      return res.status(404).send("ไม่มีออเดอร์");
    }
    return res.status(200).send(fetchSubscribes.docs[0].data());
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const addOder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const fitness = await firestore.collection("classfitness").doc(id);
    const fetchFitness = await fitness.get();

    const resultFitness = fetchFitness.data();
    resultFitness.amount++;
    await fitness.update(resultFitness);

    const subclass = await firestore
      .collection("subclass")
      .doc(data.idsubclass);
    const fetchSubClass = await subclass.get();

    const resultSubclass = fetchSubClass.data();
    resultSubclass.amount++;
    await subclass.update(resultSubclass);

    await firestore.collection("subscribes").doc(data.iduser).set(data);

    return res.status(200).send("เพิ่มออเดอร์เรียบร้อย");
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getAllOrder,
  getAllHistory,
  addOder,
};
