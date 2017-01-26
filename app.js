var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mysql          = require("mysql"),
    util           = require("util")
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tlee8833',
  password : '',
  database : 'c9'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n");  
  } else {
    console.log("Error connecting database ... \n");  
  }
});
 
app.get("/", function(req, res){
    res.redirect("/survey1");
});

app.get("/survey1", function(req, res) {
    res.render("form1");
});

app.post("/survey1", function(req, res) {
//    console.log(req.body);
    connection.query("INSERT INTO survey SET ?", req.body, function(err, res) {
        if (err) 
            throw err;
        console.log((util.inspect(res, {showHidden: false, depth: null})));
        app.set('survey1_ID', res.insertId);
        app.set('survey1', req.body); //res.insertId); 
    });
    res.redirect("/survey2");
});

app.get("/survey2", function(req, res) {
//    req.body.name_of_input
    var survey1 = req.app.get('survey1');
    res.render("form2", {survey1:survey1});
    console.log(survey1);
});

app.post("/survey2", function(req, res) {
    var survey1_ID = req.app.get('survey1_ID');
    console.log(req.body);
    console.log(req.body.QA1_1);
    console.log(survey1_ID);
    connection.query("UPDATE survey SET QA1_1 = ?, QA1_2 = ?, QA1_3 = ?, QA1_4 = ?, QA2 = ?, QA3 = ?, QA4 = ?, QA5 = ?, QA6_1 = ?, QA6_2 = ?, QA6_3 = ?, QA6_4 = ?, QA6_5 = ?, QA6_6 = ?, QA7 = ? WHERE ID = ?", [req.body.QA1_1, req.body.QA1_2, req.body.QA1_3, req.body.QA1_4, req.body.QA2, req.body.QA3, req.body.QA4, req.body.QA5, req.body.QA6_1, req.body.QA6_2, req.body.QA6_3, req.body.QA6_4, req.body.QA6_5, req.body.QA6_6, req.body.QA7, survey1_ID], function(err, res) {
        if (err) 
            throw err;
    });
    res.redirect("/finish");
});

app.get("/finish", function(req, res) {
    res.render("finish");
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The Server Has Started!");
});