const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const todos = [];
let id = 0;


app.get('/', (req, res) => {
  res.send(todos)
})

app.post("/", (req, res) => {
  let todo = {"id": id++, description: req.body.description, isCompleted: false};

  todos.push(todo);
  res.send(todo);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
