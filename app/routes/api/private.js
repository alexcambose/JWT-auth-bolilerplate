const privateRouter = require('express').Router();

const userController = require('../../controllers/user');

privateRouter.get('/user', userController.info);
privateRouter.post('/user', userController.update);
privateRouter.delete('/user', userController.delete);
privateRouter.post('/user/checkpassword', userController.checkPassword);

module.exports = privateRouter;