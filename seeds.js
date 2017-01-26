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

// connection.query('CREATE TABLE survey1(Submit_ID INT AUTO_INCREMENT PRIMARY KEY, Submission_time TIMESTAMP, BadgeID VARCHAR(10), Rounding_type VARCHAR(10), Floor VARCHAR(10), New_admit BOOLEAN, Q1 VARCHAR(10), Q2_1 VARCHAR(10), Q2_2 VARCHAR(10), Q2_3 VARCHAR(10), Q2_4 VARCHAR(10), Q3 INT, Q4 VARCHAR(10), Q5 VARCHAR(10), Q6 VARCHAR(10))', function(err,res){
//   if(err) throw err;

//   console.log('Created a table: ' + res);
// });

connection.query('CREATE TABLE survey(ID INT AUTO_INCREMENT PRIMARY KEY, Submission_time TIMESTAMP, BadgeID VARCHAR(10), Rounding_type VARCHAR(10), Floor VARCHAR(10), New_admit BOOLEAN, Q1 VARCHAR(10), Q2_1 VARCHAR(10), Q2_2 VARCHAR(10), Q2_3 VARCHAR(10), Q2_4 VARCHAR(10), Q3 INT, Q4 VARCHAR(10), Q5 VARCHAR(10), Q6 VARCHAR(10), QA1_1 VARCHAR(10), QA1_2 VARCHAR(10), QA1_3 VARCHAR(10), QA1_4 VARCHAR(10), QA2 INT, QA3 VARCHAR(10), QA4 VARCHAR(10), QA5 VARCHAR(10), QA6_1 VARCHAR(10), QA6_2 VARCHAR(10), QA6_3 VARCHAR(10), QA6_4 VARCHAR(10), QA6_5 VARCHAR(10), QA6_6 VARCHAR(10), QA7 INT)', function(err,res){
  if(err) throw err;

  console.log('Created a table: ' + res);
});

// connection.query("INSERT INTO survey_try(char1, int5, b1, str1) VALUES ('c', '50', 'TRUE', 'hey')", function(err, res){
//   if (err) throw err;
  
//   console.log('Inserted ' + res);
// });

// connection.query("SELECT * FROM survey_try", function(err, res){
//   if (err) throw err;
  
//   console.log('Selected ' + res);
// });