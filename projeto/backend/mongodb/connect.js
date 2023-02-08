"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1["default"]
    .connect(process.env.MONGODB_API)
    .then(function () { return console.log("Mongodb connected"); })["catch"](function (error) { return console.log(error); });
