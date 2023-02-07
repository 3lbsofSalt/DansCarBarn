const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let id = 0;
const todos = [];

app.get('/', (req, res) => {
    res.send(todos);
});

app.post('/', (req, res) => {
    let todo = {"id":id++, "description": req.body.description, "isCompleted": false};
    todos.push(todo); //putting something into the database and getting the id back
    res.send(todo);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});