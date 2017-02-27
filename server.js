import http from 'http';
import express from 'express';
import path from 'path';
import io from 'socket.io';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(port, () => {
  console.log ("Suite Life Web server started on port " + port);
});

const server = http.createServer(app);
const socket = io(server);
const socketPort = 3000;

socket.on('connection', (client) => {
  console.log(`Client connected: ${client}`);
  client.on('event', function(data) {
    console.log('')
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(socketPort, () => {
  console.log ("Listening for SocketIO connections on port " + socketPort);
});