"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseAdmin = __importStar(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../../../db/db");
const apiSessionGenerate_1 = require("./apiSessionGenerate");
exports.apiTokenSignin = (req, res, next) => {
    const confFile = process.env.FIREBASE_CONF || "firebase_dev.json";
    const confFilePath = path_1.default.resolve(".", "config", confFile);
    const conf = JSON.parse(fs_1.default.readFileSync(confFilePath).toString());
    if (!firebaseAdmin.apps.length) {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(conf),
            databaseURL: "https://tourapp-udemy.firebaseio.com"
        });
    }
    firebaseAdmin.auth().verifyIdToken(req.body.idtoken).then(decodedToken => {
        const userID = decodedToken.uid;
        db_1.db.one("select * from users where id = ${id}", { id: userID })
            .then((user) => {
            req.user = user;
            apiSessionGenerate_1.apiSessionGenerate(req, res, next);
        })
            .catch(err => {
            if (err.code == db_1.pgp.errors.queryResultErrorCode.noData) {
                const user = {
                    id: userID,
                    email: decodedToken.email,
                    name: decodedToken.name
                };
                db_1.db.none(db_1.pgp.helpers.insert(user, undefined, "users")).then(() => {
                    req.user = user;
                    apiSessionGenerate_1.apiSessionGenerate(req, res, next);
                });
            }
        });
    });
};
