import { RequestHandler } from "express";
import * as bcrypt from "bcrypt";
import { DataStore } from "../../../data/data";

const saltRounds = 12;

export const apiLocalSignup: RequestHandler = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        console.log(hash);
        DataStore.accounts.push({
            email: req.body.email,
            password: hash
        });
        res.send("Account created!");
    });
};