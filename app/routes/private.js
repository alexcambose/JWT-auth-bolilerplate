const privateRouter = require('express').Router();

const userRoutes = require('./api/user');

privateRouter.get('/api/user', userRoutes.info);
privateRouter.post('/api/user', userRoutes.update);
privateRouter.delete('/api/user', userRoutes.delete);
privateRouter.post('/api/user/checkpassword', userRoutes.checkPassword);

module.exports = privateRouter;