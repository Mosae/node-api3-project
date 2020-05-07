const express = require('express');
const User = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
	// do your magic!
});

router.post('/:id/posts', (req, res) => {
	// do your magic!
});

router.get('/', (req, res) => {
	// do your magic!
});

router.get('/:id', (req, res) => {
	// do your magic!
});

router.get('/:id/posts', (req, res) => {
	// do your magic!
});

router.delete('/:id', (req, res) => {
	// do your magic!
});

router.put('/:id', (req, res) => {
	// do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	const { id } = req.params;
	User.getById(id).then((user) => {
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(400).json({ errorMessage: 'invalid id' });
		}
	});
}

function validateUser(req, res, next) {
	// do your magic!
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name required' });
	}
	if (typeof name != 'string') {
		return res.status(400).json({ error: 'Are you Elon Musks new born?' });
	}
	req.body = { name };
	next();
}

function validatePost(req, res, next) {
	// do your magic!
	if (Object.keys(req.body).length === 0) {
		res.status(400).json({ message: 'missing post data' });
	} else if (!req.body.text) {
		req.status(400).json({ message: 'missing required text' });
	} else {
		next();
	}
}

module.exports = router;
