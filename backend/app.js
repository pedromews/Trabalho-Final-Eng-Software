const express = require("express");
const cors = require("cors");
const moment = require('moment');
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


app.get('/', function(req, res){
    // find all jobs using mongoose model
    Job.find().exec(function(err, items){
        // pass moment as a variable
        res.render('status', { 'jobs': items, moment: moment });
    })
});
  
