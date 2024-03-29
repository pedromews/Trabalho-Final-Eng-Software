const mongoose = require("mongoose");

const {Schema} = mongoose;

const {serviceSchema} = require("./Service");

const userSchema = new Schema
(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        profilePicture: { type: String },
        ownServices: { type: [String] },
        inProgressServices: { type: [String]},
        finishedServices: { type: [String]},
        balance: { type: Number, default: 0 },
    },

    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User; //{ User, userSchema };