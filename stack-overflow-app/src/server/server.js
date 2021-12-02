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
  "http://localhost:3000/view-question/:id",
], 
  methods: ["GET", "POST", "PUT"], 
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
    multipleStatements: true,
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

// Get all questions
app.get("/questions-get", (req, res) => {
    questionsDB.query("SELECT * FROM questions_info", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  // Get a question by id to view
  app.get("/view/:id", (req, res) => {
    questionsDB.query("SELECT * FROM question_info WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  // Get all tags
app.get("/tags-get", (req, res) => {
  questionsDB.query("SELECT * FROM tags_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

  // Get a tag by id to view
  app.get("/view/:tagid", (req, res) => {
    questionsDB.query("SELECT * FROM tags_info WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

// Registering a new user
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

// Logging in
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

// Get login status
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user}); 
  } else {
    res.send({loggedIn: false}); 
  }
});

// Logout a user and redirect to home page
app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

// Adds a question
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

// Adds tags to a question
app.post('/tags', (req, res) => {
  const values = req.body.values;

  questionsDB.query(
    "INSERT INTO tags_info (question_id, tag) VALUES ?", 
    [values], 
    (err, result) => {
        if(err) {
          res.send({err: err});
        } else {
          res.send(result);
        }
    }
  );
});

// Adds a question
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

// Gets all answers
app.get("/ansGet", (req, res) => {
  answersDB.query("SELECT * FROM answers_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Get request to know whether entry exists
app.get('/vote', (req, res) => {
  const answer_id = req.query.answer_id;
  const question_id = req.query.question_id;
  const user_id = req.query.user_id;

  answersDB.query(
    "SELECT * FROM votes_info WHERE answer_id = ? AND question_id = ? AND user_id = ?",
    [answer_id, question_id, user_id], 
    (err, result) => {
      if(err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Adding a vote while ensuring a user only votes once
app.post('/vote', (req, res) => {
  const question_id = req.body.question_id;
  const answer_id = req.body.answer_id;
  const user_id = req.body.user_id;
  const type = req.body.type;

  answersDB.query(
    "INSERT INTO votes_info (question_id, answer_id, user_id, type) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE type = ?",
    [question_id, answer_id, user_id, type, type], 
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
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

// Mapping ids to usernames 
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



app.get("/search", (req, res) => {
  const searchStr = req.query.searchStr;
  var keywordStr;
  var tag;
  var isAccepted = false;

  var searchArr = searchStr.split(",").map(function(item) {
    return item;
  });

  for(let word of searchArr)
  {
    if(word.includes("[") && word.includes("]"))
    {
      word.removeCharAt(0);
      word.removeCharAt(word.length()-1);
      tag = word;
    }else if(word.toLowerCase() == "\"isaccepted\"")
    {
      word.removeCharAt(0);
      word.removeCharAt(word.length()-1);
      isAccepted = true;
    }else
      keyword = word;
  }

  if(keywordStr != NULL && tag != NULL && isAccepted)
  {
    questionsDB.query("SELECT q.* FROM question_info q, tags_info t WHERE q.title=%?% AND q.question_id = t.question_id AND t.tag=? AND q.best_answer_id IS NOT NULL", 
    [keyword, tag], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }


});


app.get("/search-is-accepted", (req, res) => {
  questionsDB.query("SELECT * FROM questions_info WHERE best_answer_id IS NOT NULL", (err, result) => {
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