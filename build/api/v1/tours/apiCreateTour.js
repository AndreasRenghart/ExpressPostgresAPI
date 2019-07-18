"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const messages_1 = require("../../../model/shared/messages");
const db_1 = require("../../../db/db");
exports.apiCreateTour = (req, res, next) => {
    const requiredFields = ["tourTitle", "location"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.APIError.errMissingBody());
    }
    ;
    if (!req.user) {
        next(messages_1.APIError.errUnauthorizedError());
    }
    const newTour = {
        id: v4_1.default(),
        location: req.body.location || "",
        tour_title: req.body.tourTitle || "",
        tour_category: req.body.tourCategory || "",
        tour_description: req.body.tourDescription || "",
        price: req.body.price || 0,
        currency: req.body.currency || "",
        img: [],
        user_id: req.user.id
    };
    db_1.db.none(db_1.pgp.helpers.insert(newTour, undefined, "tours"))
        .then(() => {
        res.json(messages_1.PublicInfo.infoCreated({ newTour: newTour }));
    });
};
