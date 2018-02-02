const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const router = express.Router();

const publicRoutes = require('./public');
const privateRoutes = require('./private');


//All public routes
router.use(publicRoutes);

//authentication middleware
router.use((req, res, next) => {
    const token = req.body.token || req.query.token;
    if (!token) res.json({success: false, message: config.messages.NO_TOKEN_PROVIDED});
    else
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (!err) {
                res.locals.user = decoded; //save user to use in next routes
                //delete token parameter from body and query
                delete req.body.token;
                delete req.query.token;

                next();
            } else res.json({success: false, message: config.messages.INVALID_TOKEN});
        });
});

//All private routes
router.use(privateRoutes);

module.exports = router;