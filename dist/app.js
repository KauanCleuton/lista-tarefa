"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
let tasks = [];
app.get('/', (request, response) => {
    response.render('index', { tasks });
});
app.post('/add', (request, response) => {
    const { task } = request.body;
    tasks.push({ name: task, completed: false });
    response.redirect('/');
});
app.post('/remove/:taskId', (request, response) => {
    const { taskId } = request.params;
    tasks = tasks.filter((task, index) => index !== Number(taskId));
    response.sendStatus(204);
});
app.post('/toggle', (request, response) => {
    const { index } = request.body;
    tasks[index].completed = !tasks[index].completed;
    response.redirect('/');
});
app.listen(3333, () => {
    console.log('Server is running!!');
});
