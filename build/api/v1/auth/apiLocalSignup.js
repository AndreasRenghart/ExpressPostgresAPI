"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const data_1 = require("../../../data/data");
const saltRounds = 12;
exports.apiLocalSignup = (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds).then(hash => {
        console.log(hash);
        data_1.DataStore.accounts.push({
            email: req.body.email,
            password: hash
        });
        res.send("Account created!");
    });
};
