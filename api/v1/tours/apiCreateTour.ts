import { RequestHandler } from "express";
import uuid from "uuid/v4";
import * as dbModel from "../../../db/model_generated";
import { APIError, PublicInfo } from "../../../model/shared/messages";
import { db, pgp } from "../../../db/db";
import { CustomRequestHandler } from "../../../model/express";

export const apiCreateTour: CustomRequestHandler = (req, res, next) => {
    const requiredFields = ["tourTitle", "location"];
    const givenFields = Object.getOwnPropertyNames(req.body)
    if(!requiredFields.every(field => givenFields.includes(field))) {
        return next(APIError.errMissingBody());
    };
    if(!req.user) {
        next(APIError.errUnauthorizedError());
    }
    const newTour: dbModel.tours = {
        id: uuid(),
        location: req.body.location || "",
        tour_title: req.body.tourTitle || "",
        tour_category: req.body.tourCategory || "",
        tour_description: req.body.tourDescription || "",
        price: req.body.price || 0,
        currency: req.body.currency || "",
        img: [],
        user_id: req.user!.id
    }
    db.none(pgp.helpers.insert(newTour, undefined, "tours"))
        .then(() => {
            res.json(PublicInfo.infoCreated({newTour: newTour}));
        });
};