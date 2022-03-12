"use strict";

const firebase = require("../db");
const Account = require("../models/main");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const firestore = firebase.firestore();
var md5 = require("md5");

dotenv.config();

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

const getNotification = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notification = await firestore.collection("subscribes").doc(id).get();
    if (notification.exists) {
      const time = notification.data().time;
      const date = new Date();
      convertTZ(date, "Asia/Bangkok");
      const formatDate = time.startAt.split(" ");
      const dateStart = formatDate[0];
      const timeStart = formatDate[1];
      const timeNow = date.getHours();
      if (date.toLocaleDateString() === dateStart) {
        const hour = timeStart.split(":");
        const sumTime = hour[0] - timeNow;
        if (sumTime === 1) {
          return res.status(200).send(notification.data());
        }
      }
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

const getNotificationEnd = async (req, res, next) => {
  try {
    const id = req.params.id;
    const notification = await firestore.collection("subscribes").doc(id).get();
    if (notification.exists) {
      const time = notification.data().time;
      const date = new Date();
      convertTZ(date, "Asia/Bangkok");
      const formatDate = time.endAt.split(" ");
      const dateEnd = formatDate[0];
      const timeEnd = formatDate[1];
      const timeNow = date.getHours();
      if (date.toLocaleDateString() === dateEnd) {
        const hour = timeEnd.split(":");
        const sumTime = hour[0] - timeNow;
        if (sumTime <= 0) {
          return res.status(200).send(notification.data());
        }
      }
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = {
  getNotification,
  getNotificationEnd,
};
