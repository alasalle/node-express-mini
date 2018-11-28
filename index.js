// implement your API here

const express = require("express");

const db = require("./data/db");

const server = express();
const PORT = 4000;

// endpoints

// server.get('/', (req, res) => {
//     res.send(
//         // 200, {message: 'request recieved'} //deprecated: do not use
//         // res.json({message: 'hello'})
//         '<h1>request recieved</h1>'
//         )
// });

// server.get('/greet/:name', (req, res) => {
//     const name = req.params.name;
//     res.send(`Hello, ${name}!`);
// })

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      console.log("users:", users);
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "failed to get user" });
    });
});

//listener

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
