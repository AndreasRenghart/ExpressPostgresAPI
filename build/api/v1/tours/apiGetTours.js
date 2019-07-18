"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tourSummary_1 = require("../../../model/shared/tourSummary");
const tourFilters_1 = require("../../../model/shared/tourFilters");
const db_1 = require("../../../db/db");
const caching_1 = require("../general/caching");
exports.apiGetTours = (req, res, next) => {
    const filters = new tourFilters_1.TourFilters(req.query);
    db_1.db.any("select * from tours where ${condition:raw}", { condition: filters.getCondition() })
        .then((tours) => {
        console.log("Database Query...");
        const responseData = tours.map((item) => new tourSummary_1.TourSummary(item));
        caching_1.cacheSave(responseData)(req, res, next);
        res.json(responseData);
    });
};
