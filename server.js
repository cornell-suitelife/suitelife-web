import http from 'http';
import express from 'express';
import path from 'path';
import io from 'socket.io';
import auth from './server/auth';

const port = process.env.PORT || 3000;
const app = express();

app.use(auth);
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

const server = http.createServer(app);
const socket = io(server);

socket.on('connection', (client) => {
  console.log(`Client connected`);
  client.on('event', function(data) {
    console.log('')
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log ("Suite Life Web Server listening on port " + port);
});
