const express = require('express');
const Posts = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
	// do your magic!
	Posts.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(404).json({ errorMessage: 'Users not found' });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	// do your magic!
	res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
	// do your magic!
	Posts.remove(req.params.id).then((post) => {
		res.status(200).json(post);
	});
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
	// do your magic!
	const { id } = req.params;
	Posts.update(id, req.body)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res
				.status(400)
				.json({ errorMessage: 'There was a problem updating user' });
		});
});

// custom middleware
function validatePost(req, res, next) {
	// do your magic!
	if (!Object.keys(req.body).length) {
		res.status(400).json({ message: 'missing post data' });
	} else if (!req.body.text) {
		req.status(400).json({ message: 'missing required text' });
	} else {
		next();
	}
}
function validatePostId(req, res, next) {
	// do your magic!
	const { id } = req.params;
	Posts.getById(id)
		.then((post) => {
			if (post) {
				req.post = post;
				next();
			} else {
				res.status(400).json({ errorMessage: 'invalid id' });
			}
		})
		.catch((error) => {
			res.status(400).json({ errorMessage: 'There was an error with the id' });
		});
}
module.exports = router;
