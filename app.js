var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mysql          = require("mysql"),
    util           = require("util"),
    tablet_id      = 'A'

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

var connection = mysql.createConnection( {
  host     : 'localhost',
  user     : 'tlee8833',
  password : '',
  database : 'c9'
});

connection.connect(function(err) {
  if(!err) {
    console.log("Database is connected ... \n");
  } else {
    console.log("Error connecting database ... \n");
  }
});

app.get("/", function(req, res) {
  res.redirect("/survey1");
});

app.get("/survey1", function(req, res) {
  res.render("form1");
  app.set('time_form1_start', new Date());
});

app.post("/survey1", function(req, res) {
//   console.log(req.body);
  connection.query("INSERT INTO survey SET ?", req.body, function(err, res) {
    if (err) 
      console.log(err);
    app.set('survey1_ID', res.insertId);
    app.set('survey1', req.body);

    var time_form1_start = req.app.get('time_form1_start');
    var time_form1_submit = new Date();
    connection.query("UPDATE survey SET Tablet_ID = ?, Time_form1_start = ?, \
      Time_form1_submit = ? WHERE ID = ?", [tablet_id, time_form1_start, time_form1_submit,
      res.insertId], function(err, res) {
      if (err) 
        throw err;
    });
  });
  
  res.redirect("/survey2");
});

app.get("/survey2", function(req, res) {
  var survey1 = req.app.get('survey1');

  res.render("form2", {survey1:survey1});
  app.set('time_form2_start', new Date());
});

app.post("/survey2", function(req, res) {
  var survey1_ID = req.app.get('survey1_ID');
  var time_form2_start = req.app.get('time_form2_start');
  var time_form2_submit = new Date();
  app.set('time_form2_submit', time_form2_submit);

  connection.query("UPDATE survey SET Time_form2_start = ?, Time_form2_submit = ?, \
    QA1_1 = ?, QA1_2 = ?, QA1_3 = ?, QA1_4 = ?, QA2 = ?, QA3 = ?, QA4 = ?, QA5 = ?, \
    QA6 = ?, QA7_1 = ?, QA7_2 = ?, QA7_3 = ?, QA7_4 = ?, QA7_5 = ?, QA7_6 = ?, QA7_7 = ?, \
    QA7_8 = ?, QA8 = ?, Comments_2 = ? WHERE ID = ?", [time_form2_start, time_form2_submit,
    req.body.QA1_1, req.body.QA1_2, req.body.QA1_3, req.body.QA1_4, req.body.QA2, req.body.QA3,
    req.body.QA4, req.body.QA5, req.body.QA6, req.body.QA7_1, req.body.QA7_2, req.body.QA7_3,
    req.body.QA7_4, req.body.QA7_5, req.body.QA7_6, req.body.QA7_7, req.body.QA7_8,
    req.body.QA8, req.body.Comments_2, survey1_ID], function(err, res) {
    if (err) 
      throw err;
    });
  res.redirect("/finish");
});

app.get("/finish", function(req, res) {
  var time = req.app.get('time_form2_submit');
  res.render("finish", {time:time});
});

app.get("/survey3", function(req, res) {
  res.render("form3");
  app.set('time_form3_start', new Date());
});

app.post("/survey3", function(req, res) {
  // console.log(req.body);
  connection.query("INSERT INTO survey3 SET ?", req.body, function(err, res) {
    if (err) 
      console.log(err);
      
    var time_start = req.app.get('time_form3_start');
    var time_submit = new Date();
    app.set('time_form3_submit', time_submit);
    connection.query("UPDATE survey3 SET Tablet_ID = ?, Time_start = ?, Time_submit = ? \
      WHERE ID = ?", [tablet_id, time_start, time_submit, res.insertId],
      function(err, res) {
      if (err) 
        throw err;
    });
  });

  res.redirect("/finish3");
});

app.get("/finish3", function(req, res) {
  var time = req.app.get('time_form3_submit');
  res.render("finish3", {time:time});
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("The Server Has Started!");
});