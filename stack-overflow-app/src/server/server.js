const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


const loginDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'loginsystem',
})

const questionsDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'questions',
})

const answersDB = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'answers',
})

app.get("/questions-get", (req, res) => {
    questionsDB.query("SELECT * FROM questions_info", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/view/:id", (req, res) => {
    questionsDB.query("SELECT * FROM question_info WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    

    loginDB.query(
        "INSERT INTO logininfo (username, password) VALUES (?,?)", 
        [username, password], 
        (err, result) => {
            console.log(err);
        }
    );
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    loginDB.query(
        "SELECT * FROM logininfo WHERE username = ? AND password = ?", 
        [username, password], 
        (err, result) => {

            if(err)
            {
                res.send({err: err});
            }

            if(result.length > 0)
            {
                res.send(result);
            }
            else
            {
                res.send({ message: "Wrong username/password combination!"});
            }
            
        }
    );
});

app.post('/ask', (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    

    questionsDB.query(
        "INSERT INTO questions_info (title, content) VALUES (?,?)", 
        [title, content], 
        (err, result) => {
            if(err) {
                res.send({err: err});
            } else {
                res.send(result);
            }
        }
    );
});

app.post('/ans', (req, res) => {

    const answer = req.body.answer;

    answersDB.query(
        "INSERT INTO answers_info (answer) VALUES (?)", 
        [answer], 
        (err, result) => {
            if(err) {
              console.log(err);
            } else {
              res.send(result);
            }
        }
    );
});

app.get("/ansGet", (req, res) => {
  answersDB.query("SELECT * FROM answers_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5001, () => {
    console.log("running server");
});