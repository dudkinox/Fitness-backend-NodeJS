const express = require("express");
const {
  //Login
  login,
  register,
  getAllAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  //forgotPassword
  forgotPassword,
  //Fitness Class
  addClass,
  deleteClass,
  //Fitness SubClass
  //Fitness Subcribe
  updateSubcribe,
} = require("../controllers/mainController");

const router = express.Router();

//Login
router.get("/user/:email/:password", login);
router.post("/user/register", register);
router.get('/user/:id', getAccount);
router.get('/user', getAllAccount);
router.put('/user/:id', updateAccount);
router.delete('/user/:id', deleteAccount);

//forgotPassword
router.post('/forgot', forgotPassword);

//Fitness_Class
router.post('/fitness/class/add', addClass);
router.delete('/fitness/class/:id', deleteClass);
//Fitness_SubClass

//Fitness_Subcribe
router.put('/fitness/subcribe/:id', updateSubcribe);

module.exports = {
  routes: router,
};
