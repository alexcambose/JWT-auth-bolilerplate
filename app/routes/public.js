const publicRoutes = require('express').Router();

const userRoutes = require('./api/user');

publicRoutes.get('/api', (req, res) => {
    res.send('This is the api root');
});
publicRoutes.post('/api/user/register', userRoutes.register);
publicRoutes.post('/api/user/login', userRoutes.login);

module.exports = publicRoutes;