const express = require("express");
const {
  addAccount,
  getAllAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  login,
} = require("../controllers/loginController");

const router = express.Router();

router.get("/user/:email/:password", login);
// router.post("/login", addAccount);
// router.get('/login', getAllAccount);
// router.get('/login/:id', getAccount);
// router.put('/login/:id', updateAccount);
// router.delete('/login/:id', deleteAccount);

module.exports = {
  routes: router,
};
