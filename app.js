var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
 var path = require('path')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo",{ useNewUrlParser: true,useUnifiedTopology: true});
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    Address: String,


});
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
