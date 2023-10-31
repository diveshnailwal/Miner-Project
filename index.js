// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Choose an appropriate port

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes and API endpoints will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import the required modules and database connection
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const app = express();
//const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'deepu@2002',
  database: 'feedback_app',
});

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});
app.post('/register', (req, res) => {
  // Extract user data from the request body
  const { username, password, email } = req.body;

  // Create an object to store user data
  const userData = {
    username,
    password,
    email,
  };

  // Insert user data into the database
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, userData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    } else {
      res.status(201).json({ message: 'User created successfully' });
    }
  });
});


// Define an endpoint to handle feedback submissions
app.post('/submit-feedback', (req, res) => {
  const {
    studentName,
    course,
    teacherName,
    teachingPoints,
    materialPoints,
    communicationPoints,
    query,
  } = req.body;

  // Insert feedback data into the database
  const feedbackData = {
    student_name: studentName,
    course,
    teacher_name: teacherName,
    teaching_points: teachingPoints,
    material_points: materialPoints,
    communication_points: communicationPoints,
    query,
  };

  const sql = 'INSERT INTO feedback SET ?';
  db.query(sql, feedbackData, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error submitting feedback' });
    } else {
      res.status(200).json({ message: 'Feedback submitted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
