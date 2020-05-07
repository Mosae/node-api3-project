const express = require('express');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter');

const server = express();

//These are the golbal middleware
server.use(express.json()); //built in middleware

server.use(function (res, res, next) {
	console.log('A request just happended');
	next();
});
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

// server.use('/:id', postRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
	const method = req.method;
	const endpoint = req.originalURL;
	const time = Date();
}

module.exports = server;
