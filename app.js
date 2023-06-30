const express = require('express');
const expressWs = require('express-ws');

const app = express();
const wsInstance = expressWs(app);

// Serving the html file from public dir
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.ws('/', (ws, req) => {
	console.log('WebSocket connection established.');

	// WebSocket received a message from the client
	ws.on('message', (message) => {
		console.log('Received message from client:', message);

		// Sending data to the client
		ws.send(`You sent me - ${message}`);
	});

	// WebSocket connection closed
	ws.on('close', () => {
		console.log('WebSocket connection closed.');
	});
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
