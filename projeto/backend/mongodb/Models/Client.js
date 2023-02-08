"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ClientMongo = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1["default"].Schema({
    name: String,
    email: String,
    cpf: String,
    adress: String,
    tel: String
});
exports.ClientMongo = mongoose_1["default"].model("Client", schema);
