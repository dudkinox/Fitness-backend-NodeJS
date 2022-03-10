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
} = require("../controllers/mainController");

const router = express.Router();

//Login
router.get("/user/:email/:password", login);
router.post("/user/register", register);
router.get('/user/:id', getAccount);
router.get('/user', getAllAccount);
// router.put('/user/:id', updateAccount);
// router.delete('/user/:id', deleteAccount);

//forgotPassword
router.post('/forgot', forgotPassword);



module.exports = {
  routes: router,
};
