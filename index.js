// code away!
const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.json(`Express middleware`);
});

server.listen(5000, () => {
	console.log('Server is up on port 5000');
});
