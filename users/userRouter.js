const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
	// do your magic!
	Users.insert(req.body)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(400).json({ error: 'There was a problem adding user' });
		});
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
	// do your magic!
	req.body.user_id = req.user.id;
	Posts.insert(req.body)
		.then((posted) => {
			res.status(201).json(posted);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: ' an error occured while making new post' });
		});
});

router.get('/', (req, res) => {
	// do your magic!
	Users.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(500).json({ error: 'There was a problem gtting the users' });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	// do your magic!
	res.status(200).json(req.user);
});

router.get('/:id/posts', validateUser, (req, res) => {
	// do your magic!
	const user_id = req.params.id;
	Users.getUserPosts(user_id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ errorMessage: ' There was an error getting the post' });
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	// do your magic!
	Users.remove(req.params.id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			res
				.status(400)
				.json({ errorMessage: 'There was a problem deleting user' });
		});
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
	// do your magic!
	const { id } = req.params;
	Users.update(id, req.body)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(400).json({ MESSAGE: 'There was a problem updating user' });
		});
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	const { id } = req.params;
	Users.getById(id).then((user) => {
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
