const publicRoutes = require('express').Router();

const userController = require('../../controllers/user');

publicRoutes.get('/', (req, res) => {
    res.send('This is the api root');
});
publicRoutes.post('/user/register', userController.register);
publicRoutes.post('/user/login', userController.login);

module.exports = publicRoutes;