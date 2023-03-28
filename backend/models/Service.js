const mongoose = require("mongoose");

const {Schema} = mongoose;

const serviceSchema = new Schema
(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        type: { type: String, required: true },
        status: { type: Number, required: true },
        actor: { type: String },
    },

    { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = { Service, serviceSchema };