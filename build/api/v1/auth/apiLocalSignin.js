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
exports.apiLocalSignin = (req, res, next) => {
    const account = data_1.DataStore.accounts.find(acc => {
        return acc.email == req.body.email;
    });
    if (account) {
        bcrypt.compare(req.body.password, account.password).then(match => {
            if (match) {
                res.send("User logged in!");
            }
            else {
                res.send("Login Failed!");
            }
        });
    }
    else {
        res.send("Login Failed!");
    }
};
