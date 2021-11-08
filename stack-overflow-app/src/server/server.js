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

app.listen(5001, () => {
    console.log("running server");
});