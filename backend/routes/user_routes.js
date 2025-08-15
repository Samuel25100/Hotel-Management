const Users_cont = require("../controller/users_cont");
const express = require("express");
const jwt_auth = require("../middleware/jwt_auth");

const routes_user = express.Router();

routes_user.post('/signup', Users_cont.create_acc);
//routes_user.post('/admin/signup', Users_cont.create_admin);
routes_user.post('/login', Users_cont.login);
routes_user.get('/get/:role', jwt_auth, Users_cont.get_alluser);
routes_user.post('/refresh-token', Users_cont.refreshToken);

module.exports = routes_user;
