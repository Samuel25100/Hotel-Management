const Users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const uuidv4 = require("uuid");
const { ObjectId } = require("mongoose").Types;

class Users_cont {
    
    static async create_acc(req, res) {
        const { name, email, pwd, role, phone} = req.body;
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
        const hspwd = await bcrypt.hash(pwd, 10);
        const result = await Users.create({ name, email, pwd: hspwd, role, phone });
        if (!result) return res.status(500).json({ "message": "Internal Server Error in creating" });
        const userId = result._id.toString();
        /* JWT token */
        const accessToken = jwt.sign({ userId },
            process.env.ACCESS_TOKEN, { expiresIn: '1d'});

        const refreshToken = jwt.sign({ userId },
            process.env.REFRESH_TOKEN, { expiresIn: '7d'});
        return res.status(201).json({ "message": "Success", "user": { userId, email, name }, accessToken, refreshToken });
    }

    static async create_admin(req, res) {
        const { name, email, pwd, phone } = req.body;
        if (name == null || email == null || pwd == null) {
            res.status(400).json({"message": "Name, Email or Password is missing"});
            return;
        }
        const user = await Users.findOne({ email });
        if (user) {
            res.status(403).json({"message": "Account already exist"});
            return;
        }
        const hspwd = await bcrypt.hash(pwd, 10);
        const result = await Users.create({ name, email, pwd: hspwd, role: "admin", phone });
        if (!result) return res.status(500).json({ "message": "Internal Server Error in creating" });
        const userId = result._id.toString();
        /* JWT token */
        const accessToken = jwt.sign({ userId },
            process.env.ACCESS_TOKEN, { expiresIn: '1d'});

        const refreshToken = jwt.sign({ userId },
            process.env.REFRESH_TOKEN, { expiresIn: '7d'});
        return res.status(201).json({ "message": "Success", "user": { userId, email, name }, accessToken, refreshToken });
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
                res.status(200).json({ accessToken, refreshToken, email: user.email, name: user.name, phone: user.phone });
                return;
            }
            res.status(401).json({ message: "Wrong email or password" });
            return;   
        }
        res.status(401).json({ message: "The account doesn't exist"});
        return;
    }

    static async get_alluser(req, res) {
        const userId = req.userId;
        const userRole = req.params.role;
        const user = await Users.findById( new ObjectId(userId));
        if (user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
        if (!userRole) {
            const users = await Users.findById(userId).select("-pwd -__v");
            if (!users) return res.status(404).json({ message: "User not found" });
            return res.status(200).json({ user: users });
        } else if (["guest", "admin", "staff", "all"].includes(userRole) === false) {
            return res.status(400).json({ message: "Invalid role specified" });
        } else if (userRole === "all") {
            const users = await Users.find({}, { pwd: 0, __v: 0 });
            if (!users) return res.status(404).json({ message: "No users found" });
            return res.status(200).json({ users });
        }
        const users = await Users.find({ role: userRole }, { pwd: 0, __v: 0 });
        if (!users) return res.status(404).json({ message: "No users found" });

        res.status(200).json({ users });
    }

    static async refreshToken(req, res) {
        try {
            const refreshToken = req.body.token;
            if (!refreshToken) return res.status(401).json({ message: "Refresh token is required" });
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
                if (err) return res.status(403).json({ message: "Invalid refresh token, login again" });
                const userId = decoded.userId;
                const user = Users.findById(new ObjectId(userId));
                if (!user) return res.status(404).json({ message: "User not found" });
                // Generate new access token and refresh token
                const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
                return res.status(200).json({ accessToken });
            });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = Users_cont;
