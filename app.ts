const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.set('view', path.join(__dirname, 'view'));

app.use(bodyParser.urlencoded({ extended: true }));

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
  tasks.splice(Number(taskId), 1);
  response.sendStatus(200);
});

app.post('/toggle', (request: Request, response: Response) => {
  const { index } = request.body;
  tasks[index].completed = !tasks[index].completed;
  response.redirect('/');
});

app.listen(3333, () => {
  console.log('Server is running!!');
});