import express = require('express');

import path = require('path');
import { Request, Response } from "express";
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

interface Task {
  name: string;
  completed: boolean;
}

let tasks: Task[] = [];



app.get('/', (request: Request, response: Response) => {
  response.render('index', { tasks });
});

app.post('/add', (request: Request, response: Response) => {
  const { task } = request.body;
  tasks.push({ name: task, completed: false });
  response.redirect('/');
});

app.post('/remove/:taskId', (request: Request, response: Response) => {
  const { taskId } = request.params;
  tasks = tasks.filter((task, index) => index !== Number(taskId));
  response.sendStatus(204);
});


app.post('/toggle', (request: Request, response: Response) => {
  const { index } = request.body;
  tasks[index].completed = !tasks[index].completed;
  response.redirect('/');
});

app.listen(3333, () => {
  console.log('Server is running!!');
});
