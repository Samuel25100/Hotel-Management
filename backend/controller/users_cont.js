const Users = require("../models/users_db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const uuidv4 = require("uuid");

class Users_cont {
    
    static async create_acc(req, res) {
        const { name, email, pwd, role} = req.body;
        if (role == "Admin") {
            res.status(403).json({"message": "Not Authorized to create Admin account"});
            return;
        }
        const user = await Users.findOne({ email });
        if (user) {
            res.status(403).json({"message": "Account already exist"});
            return;
        }
        if (name == null) {
            res.status(400).json({"message": "Name is missing"});
            return;
        }
        if (email == null) {
            res.status(400).json({"message": "Email is missing"});
            return;
        }
        if (pwd == null) {
            res.status(400).json({"message": "Password is missing"});
            return;
        }
        const result = await Users.create({ name, email, pwd, role});
        const userId = result._id.toString();
        /* JWT token */
        const accessToken = jwt.sign({ userId },
            process.env.ACCESS_TOKEN, { expiresIn: '1d'});

        const refreshToken = jwt.sign({ userId },
            process.env.REFRESH_TOKEN, { expiresIn: '7d'});
        res.status(201).json({ "message": "Success", "user": { userId, email, name }, accessToken, refreshToken });
    }

    static async login(req, res) {
        const { email, pwd } = req.body;
        const user = await Users.findOne({ email });
        if (user) {
            const userId = user._id.toString();
            const match = await bcrypt.compare(pwd, user.pwd);
            if (match) {
                const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: '1d'});
                const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN, { expiresIn: '7d'});
                res.status(200).json({ accessToken, refreshToken });
                return;
            }
            res.status(401).json({ message: "Wrong email or password" });
            return;   
        }
        res.status(401).json({ message: "Wrong email or password" });
        return;
    }
}

module.exports = Users_cont;
