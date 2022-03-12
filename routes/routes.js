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
  getallclass,
  getrecommend,
  addClass,
  deleteClass,
  updateClass,
  //Fitness SubClass
  addSubClass,
  getallsubclass,
  deleteTimeSubClass,
  deleteSubClass,
  updateSubClass,
  //Fitness Subcribe
  getSubcribe,
  updateSubcribe,
} = require("../controllers/mainController");

const {
  getAllOrder,
  getAllHistory,
  addOder,
} = require("../controllers/orderController");

const { getClass } = require("../controllers/adminController");
const {
  getNotification,
  getNotificationEnd,
} = require("../controllers/notificationController");

const router = express.Router();

//Login
router.get("/user/:email/:password", login);
router.post("/user/register", register);
router.get("/user/:id", getAccount);
router.get("/user", getAllAccount);
router.put("/user/:id", updateAccount);
router.delete("/user/:id", deleteAccount);

// my order
router.get("/order/:id", getAllOrder);
router.post("/add-order/:id", addOder);

// my history
router.get("/history/:id", getAllHistory);

//forgotPassword
router.post("/forgot", forgotPassword);

//Fitness_Class
router.get("/fitness/class", getallclass);
router.get("/fitness/class/recommend", getrecommend);
router.post("/fitness/class/add", addClass);
router.delete("/fitness/class/:id", deleteClass);
router.put("/fitness/class/:id", updateClass);

//Fitness_SubClass
router.get("/fitness/subclass/:id", getallsubclass);
router.post("/fitness/subclass/add", addSubClass);
router.put("/fitness/subclass/:id/:index", deleteTimeSubClass);
router.put("/fitness/subclass/:id", updateSubClass);
router.delete("/fitness/subclass/:id", deleteSubClass);

//Fitness_Subcribe
router.get("/fitness/subcribe/:id", getSubcribe);
router.put("/fitness/subcribe/:id", updateSubcribe);

// notification
router.get("/notification/:id", getNotification);
router.get("/notification/end/:id", getNotificationEnd);

// addmin
router.get("/admin/class", getClass);

module.exports = {
  routes: router,
};
