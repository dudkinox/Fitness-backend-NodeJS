const express = require("express");
const {
  register,
  getAllAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  login,
} = require("../controllers/loginController");

const router = express.Router();

router.get("/user/:email/:password", login);
router.post("/user/register", register);
router.get('/user', getAllAccount);
router.get('/user/:id', getAccount);
router.put('/user/:id', updateAccount);
router.delete('/user/:id', deleteAccount);

module.exports = {
  routes: router,
};
