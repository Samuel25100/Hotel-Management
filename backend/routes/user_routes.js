const Users_cont = require("../controllers/users_cont");
const express = require("express");

const routes_user = express.Router();

routes_user.post('/signup', Users_cont.create_acc);
routes_user.post('/login', Users_cont.login);
routes_user.get('/user/:role', Users_cont.get_alluser);

module.exports = routes_user;
