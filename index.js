// code away!
const server = require('./server.js');

server.listen(5000, () => {
	console.log('Server is up on port 5000');
});
// const port = process.env.PORT || 5002;
// server.listen(port, () => {
// 	console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
// });
