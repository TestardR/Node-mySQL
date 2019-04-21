const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

// Connect
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('database created');
  });
});

// Create table
app.get('/createpoststable', (req, res) => {
  let sql =
    'CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('table created');
  });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {
    title: 'My post 2',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt sequi sint tempore quae, similique exercitationem quidem aspernatur doloribus explicabo, soluta, veritatis officia. Blanditiis impedit distinctio nobis accusantium, dolorem voluptate eius?'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('post 1 added');
  });
});

// Inset post 2
app.get('/addpost2', (req, res) => {
  let post = {
    title: 'My post 2',
    body:
      'Nulla qui aliquip commodo quis sint. Ut deserunt et velit cupidatat aliquip. Nulla amet enim anim amet ut adipisicing officia. Exercitation enim eiusmod esse consequat deserunt culpa est dolore enim ullamco dolore. Exercitation mollit in nulla ullamco consequat ullamco id adipisicing. Aute fugiat ex ut laborum voluptate non proident mollit ullamco adipisicing aliqua.'
  };
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('post 2 added');
  });
});

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send('Posts fetched');
  });
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});
