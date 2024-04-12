// controllers/users.js

import User from "../models/User.js";
import { registerValidator, loginValidator } from "../utilities/validators.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const validationResult = registerValidator.validate(req.body);
        if (validationResult.error) {
            res.status(400).json(validationResult)
        } else {
            const { firstName, lastName, email, password, gender, birthday } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(401).json({ error: "An account with this email exists already" });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                gender,
                birthday
            });
            await newUser.save();
            res.status(201).json({ message: "Account created successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body);
        if (validationResult.error) {
            res.status(400).json({ validationResult });
        } else {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ error: 'Wrong email and/or password' });
                return;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!passwordsMatch) {
                res.status(401).json({ error: 'Wrong email and/or password' });
                return;
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                message: `Welcome ${user.firstName}`,
                user,
                token
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
