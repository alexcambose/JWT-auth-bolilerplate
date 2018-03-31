const { checkSchema } = require('express-validator/check');
const lang = require('../../translations/index');
const publicRoutes = require('express').Router();

const userController = require('../../controllers/user');
const User = require('../../models/User');

publicRoutes.get('/', (req, res) => {
    res.send('This is the api root');
});

publicRoutes.post('/user/register',checkSchema({
    first_name: { exists: true, errorMessage: lang.t('errors.first_name') },
    last_name: { exists: true, errorMessage: lang.t('errors.last_name') },
    email: {
        isEmail: {
            errorMessage: lang.t('errors.email.invalid')
        },
        custom: {
            options: email => User.isEmailUnique(email),
            errorMessage: lang.t('errors.email.taken'),
        },
    },
    password: {
        isLength: {
            errorMessage: lang.t('errors.password.length', {start: 6, end: 30}),
            options: { min: 6, max: 30 }
        }
    },
}), userController.register);

publicRoutes.post('/user/login', checkSchema({
    email: {
        isEmail: { errorMessage: lang.t('errors.email.invalid') },
        custom: {
            options: (email) => User.findOne({email}),
            errorMessage: lang.t('errors.email.not_found'),
        }
    },
    password: {
        exists: true, errorMessage: lang.t('errors.password.exists'),
        custom: {
            options: (password, { req }) => User.findOne({email: req.body.email, password}),
            errorMessage: lang.t('errors.password.wrong'),
        }
    }
}), userController.login);

module.exports = publicRoutes;