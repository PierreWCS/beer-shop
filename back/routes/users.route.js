const router = require('express').Router();
const user = require('../controllers/users.controller');
const login = require('../controllers/login.controller');

// New user
router.post('/', user.create);

// Get all the users
router.get('/', user.findAll);

// Get an user by ID
router.get('/:userId', user.findById);

// Update an user by ID
router.patch('/:userId', user.update);

// Delete an user
router.delete('/:userId', user.delete);

// Login token
router.patch('/token/:userId', user.newToken);

// Connect an user
router.post('/login', login.connect);

module.exports = router;
