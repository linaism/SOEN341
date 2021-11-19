const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", 
  "http://localhost:3000/ask-question", 
  "http://localhost:3000/view-question/:id"], 
  methods: ["GET", "POST"], 
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  key: "userId",
  secret: "ravioli",
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    maxAge: oneDay
  }
}));

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
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      loginDB.query(
        "INSERT INTO logininfo (username, password) VALUES (?,?)", 
        [username, hash], 
        (err, result) => {
            console.log(err);
        }
      );
    })
    
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    loginDB.query(
        "SELECT * FROM logininfo WHERE username = ?;", 
        username, 
        (err, result) => {

            if(err) {
                res.send({err: err});
            }

            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (err, response) => {
                  if (response) {
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                  } else {
                    res.send({ message: "Wrong username/password combination!"});
                  }
                })
            }
            else {
                res.send({ message: "User doesn't exist"});
            }
            
        }
    );
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user}); 
  } else {
    res.send({loggedIn: false}); 
  }
  // const username = req.body.username;
  // const password = req.body.password;

  // loginDB.query("SELECT * FROM logininfo WHERE username = ? AND password = ?", 
  // [username, password], 
  // (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send(result);
  //   }
  // });
});

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/ask', (req, res) => {

    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;

    questionsDB.query(
        "INSERT INTO questions_info (title, content, user_id) VALUES (?,?,?)", 
        [title, content, user_id], 
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
    const question_id = req.body.question_id;
    const user_id = req.body.user_id;

    answersDB.query(
        "INSERT INTO answers_info (answer, question_id, vote_count, user_id) VALUES (?, ?, ?, ?)", 
        [answer, question_id, 0, user_id], 
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

// Add vote information in voting database for given answer and question id
app.post('/vote', (req, res) => {
  const answer_id = req.body.answer_id;
  const question_id = req.body.question_id;

  questionsDB.query(
      "INSERT INTO answer_votes (answer_id, question_id) VALUES (?, ?)", 
      [answer_id, question_id], 
      (err, result) => {
          if(err) {
            console.log(err);
          } else {
            res.send(result);
          }
      }
  );
});

// Update number of votes in answer database
app.put("/update-vote", (req, res) => {
  const answer_id = req.body.answer_id;
  let vote_count = 0;
  if (req.body.vote_count) {vote_count = req.body.vote_count;}

  answersDB.query(
    "UPDATE answers_info SET vote_count = ? WHERE answer_id = ?",
    [vote_count, answer_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Update best answer
app.put("/update-best", (req, res) => {
  const question_id = req.body.question_id;
  const best_answer_id = req.body.best_answer_id;

  questionsDB.query(
    "UPDATE questions_info SET best_answer_id = ? WHERE question_id = ?",
    [best_answer_id, question_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Mapping ids to values 
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  loginDB.query("SELECT username FROM logininfo WHERE id = ?", 
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );

});

app.listen(5001, () => {
    console.log("running server");
});