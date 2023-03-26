const mongoose = require("mongoose");

async function main()
{
    try
    {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://pedromews:4kXbHeSObV0Z3kwT@cluster0.f6nhuhm.mongodb.net/?retryWrites=true&w=majority");
        console.log("Conected to DB!");
    }
    catch (error)
    {
        console.log(error);
    }
}

module.exports = main;