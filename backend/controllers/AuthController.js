const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User exists", success: false });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        return res.status(201).json({ message: "Signed up", success: true });
    } catch (err) {
        return res.status(500).json({ message: "Internal error", success: false });
    }
}

const signin= async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User doesnot exists", success: false });
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword)
        return res.status(403).json({ message: "Incorrect password", success: false });
        const jwtToken=jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({ message: "Logged in", success: true,jwtToken,email,name:user.name });
    } catch (err) {
        return res.status(500).json({ message: "Internal error", success: false });
    }
}

module.exports = { signup,signin };
