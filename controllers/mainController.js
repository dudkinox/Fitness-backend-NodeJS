"use strict";

const firebase = require("../db");
const Account = require("../models/login");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const firestore = firebase.firestore();
var md5 = require("md5");

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

//LOGIN

const login = async (req, res, next) => {
  const email = req.params.email;
  const password = req.params.password;
  const hashPassword = md5(password);
  const account = await firestore
    .collection("user")
    .where("email", "==", email)
    .where("password", "==", hashPassword);

  const data = await account.get();
  if (data.empty) {
    return res.status(404).send(false);
  } else {
    return res.status(200).send(data.docs[0].data());
  }
};

const register = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data.firstname);
    const hashPassword = md5(data.password);
    const newdata = {
      firstname: data.firstname,
      lastname: data.lastname,
      tel: data.tel,
      email: data.email,
      password: hashPassword,
      type: data.type,
    };

    await firestore.collection("user").doc().set(newdata);
    res.status(404).send("เพิ่มบัญชีสำเร็จ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const account = await firestore.collection("user").doc(id);
    const data = await account.get();
    if (!data.exists) {
      res.status(404).send("หาไม่เจอ");
    } else {
      const newdata = {
        firstname: data.data().firstname,
        lastname: data.data().lastname,
        email: data.data().email,
        tel: data.data().tel,
        type: data.data().type,
      };

      res.send(newdata);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllAccount = async (req, res, next) => {
  try {
    const account = await firestore.collection("user");
    const data = await account.get();
    const AccountArray = [];
    if (data.empty) {
      res.status(404).send("ไม่พบข้อมูลใด");
    } else {
      data.forEach((doc) => {
        const account = {
          id:doc.id,
          firstname:doc.data().firstname,
          lastname:doc.data().lastname,
          email:doc.data().email,
          tel:doc.data().tel,
          type:doc.data().type
        };
        AccountArray.push(account);
      });
      res.send(AccountArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const Account = await firestore.collection("login").doc(id);
    await Account.update(data);
    res.send("แก้ไขข้อมูลแล้ว");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("login").doc(id).delete();
    res.send("ลบสำเร็จ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// forgotPassword

const forgotPassword = async (req, res, next) => {
  try {
    var val = Math.floor(1000 + Math.random() * 9000);
    const data = req.body;
    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const account = await firestore
      .collection("user")
      .where("email", "==", data.email);
    const newdata = await account.get();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var FROM_ADDRESS = EMAIL;

    function PageSendEmail(data) {
      const page_email =
        "<p>OTP : " +
        data +
        "</p>" +
        "<p><b>Time " +
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "</b></p>";
      return page_email;
    }

    let mailOptions = {
      from: "Fitness <" + FROM_ADDRESS + ">",
      to: data.email,
      subject: "ResetPassword",
      html: PageSendEmail(val),
    };

    const verify = Buffer.from(
      year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        data.email +
        "/" +
        val
    ).toString("base64");

    if (newdata.empty) {
      return res.status(404).send(false);
    } else {
      if (!res.headersSent) {
        transporter.sendMail(mailOptions, function (err, success) {
          if (err) {
            console.log(err);
          } else {
            console.log("Emaill send Successfully");
          }
        });
        await firestore.collection("forgotpassword").doc().set({ verify });
        return res.status(200).send(val.toString());
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  //login
  login,
  register,
  getAllAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  //forgotPassword
  forgotPassword,
};
