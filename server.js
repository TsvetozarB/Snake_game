'use strict';

import { join } from 'path';
import express, { static } from 'express';
import { Server } from 'http';
import socket from 'socket.io';
import { urlencoded } from 'body-parser';

const app = express();
const server = Server(app);
const io = socket(server);

const port = process.env.PORT || 8000;

let color = '#ffffff';

app.use(urlencoded({ extended: false }));
app.use('/', static(join(__dirname, 'html')));

io.on('connection', (s) => {
  console.log('Socket.io client connected');
  s.emit('color', color);
});

app.post('/color', (req, res) => {
  color = req.body.color;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
});

app.get('/color/:color', (req, res) => {
  color = req.params.color.replace('+', '#');
  console.log('Changing color to', color);
  io.emit('color', color);
  res.send({ color });
});

app.post('/message', (req, res) => {
  color = req.body.Body;
  console.log('Changing color to', color);
  io.emit('color', color);
  res.end();
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

console.log('node-live-color example - see: https://github.com/rsp/node-live-color');