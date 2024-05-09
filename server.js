const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const moment = require('moment');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send timestamped data to the client every second
  const interval = setInterval(() => {
    const data = JSON.stringify({
      date: moment().format('YYYY-MM-DD HH:mm:ss'),
      value: Math.random() // Replace this with actual data
    });
    ws.send(data);
  }, 1000);

  ws.on('message', (data) => {
    console.log('Message received: ' + data);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval); // Clear the interval on client disconnect
  });
});

// Serve static files from the 'public' folder
app.use(express.static('public'));

server.listen(8082, () => { // Change this to match the port expected by the React component
  console.log('Server started on port 8080');
});
