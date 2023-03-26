const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// DB connection
const conn = require("./db/conn");
conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

app.listen(8080, function ()
{
    console.log("Server online!");
})

app.use(cors({
    origin: 'http://localhost:8080'
}));
  
