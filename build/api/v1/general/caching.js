"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../../cache/cache");
exports.cacheCheck = (req, res, next) => {
    cache_1.cache.get(req.originalUrl, (err, data) => {
        if (!err && data) {
            res.json(data);
        }
        else
            next();
    });
};
function cacheSave(data) {
    return (req, res, next) => {
        cache_1.cache.set(req.originalUrl, data);
    };
}
exports.cacheSave = cacheSave;
;
