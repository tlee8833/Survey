var mysql = require("mysql");

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

connection.query('CREATE TABLE survey(ID INT AUTO_INCREMENT PRIMARY KEY, \
  Tablet_ID VARCHAR(10), BadgeID VARCHAR(20), Time_form1_start DATETIME, \
  Time_form1_submit DATETIME, Time_form2_start DATETIME, Time_form2_submit DATETIME, \
  Rounding_type VARCHAR(10), Floor VARCHAR(10), New_admit VARCHAR(10), Q1 VARCHAR(10), \
  Q2_1 VARCHAR(10), Q2_2 VARCHAR(10), Q2_3 VARCHAR(10), Q2_4 VARCHAR(10), Q3 INT, \
  Q4 VARCHAR(10), Q5 VARCHAR(10), Q6 VARCHAR(10), Q7 VARCHAR(10), Comments_1 VARCHAR(500), \
  QA1_1 VARCHAR(10), QA1_2 VARCHAR(10), QA1_3 VARCHAR(10), QA1_4 VARCHAR(10), QA2 INT, \
  QA3 VARCHAR(10), QA4 VARCHAR(10), QA5 VARCHAR(10), QA6 VARCHAR(10), QA7_1 VARCHAR(10), \
  QA7_2 VARCHAR(10), QA7_3 VARCHAR(10), QA7_4 VARCHAR(10), QA7_5 VARCHAR(10), \
  QA7_6 VARCHAR(10), QA7_7 VARCHAR(10), QA7_8 VARCHAR(10), QA8 INT, Comments_2 VARCHAR(500))',
  function(err,res) {
  if(err) 
    throw err;
  console.log('Created a table: ' + res);
});

connection.query('CREATE TABLE survey3(ID INT AUTO_INCREMENT PRIMARY KEY, \
  Tablet_ID VARCHAR(10), BadgeID VARCHAR(20), Time_start DATETIME, Time_submit DATETIME, \
  Position VARCHAR(10), Rounding_type VARCHAR(15), Floor VARCHAR(10), Q1 VARCHAR(10), \
  Q2 VARCHAR(10), Q3_a VARCHAR(15), Q3_b VARCHAR(15), Q4 VARCHAR(15), Q5_a VARCHAR(15), \
  Q5_b VARCHAR(15), Q5_c VARCHAR(15), Q5_d VARCHAR(15), Q5_e VARCHAR(15), Q5_f VARCHAR(15), \
  Q6 INT, Q7 INT, Comments VARCHAR(500))', function(err,res) {
  if(err) 
    throw err;
  console.log('Created a table: ' + res);
});