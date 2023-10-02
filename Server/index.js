const express = require("express");
const cors = require("cors");
const { createPool } = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

const db = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

app.post("/validate", (req, res) => {
  const token = req.body.token;
  try {
    const jwtValue = jwt.verify(token, SECRET);

    if (jwtValue) {
      db.query(
        "SELECT * FROM user WHERE id_user = ?",
        [jwtValue.userId],
        (err, result) => {
          if (result) {
            res.send({
              id_user: result[0].id_user,
              user: result[0].user_name,
            });
          }
          if (err) {
            console.log(`Error while select from database: ${err}`);
          }
        }
      );
    }
  } catch (err) {
    return res.send("Invalid token");
  }
});

const sendJwt = (user, res) => {
  const token = jwt.sign({ userId: user.id_user }, SECRET);
  return res.send({ auth: true, name: user.user_name, token });
};

app.post("/signup", (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name) {
    return res.status(422).json({ msg: "Name is required to signup" });
  }

  if (!email) {
    return res.status(422).json({ msg: "Email is required to signup" });
  }

  if (!password) {
    return res.status(422).json({ msg: "Password is required to signup" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const insertNewUser = () => {
    const query =
      "INSERT INTO user (user_name, user_email, user_password,user_phone) VALUES (?,?,?,?)";
    db.query(query, [name, email, passwordHash, phoneNumber], (err, result) => {
      if (err) {
        console.log("error inserting new user");
      }
      if (result) {
        res.send(true);
      }
    });
  };

  const checkEmail = () => {
    db.query(
      "SELECT * FROM user WHERE user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.log("error inserting new user");
        }
        if (result.length == 0) {
          insertNewUser();
        } else {
          res.send(false);
        }
      }
    );
  };
  checkEmail();
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "Email is required to singin" });
  }
  if (!password) {
    return res.status(422).json({ msg: "Password is rhquired to singin" });
  }

  const query = "SELECT * FROM user WHERE user_email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.log(`Error while select from database: ${err}`);
    }
    if (result.length > 0) {
      bcrypt
        .compare(password, result[0].user_password)
        .then(function (resultPasswordCheck) {
          resultPasswordCheck
            ? sendJwt(result[0], res)
            : res.json({ msg: "Wrong email/password combination" }).end();
        });
    }
  });
});

app.listen(3001);
