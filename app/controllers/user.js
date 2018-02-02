const utils = require('../utils');
const config = require('../../config');
const _ = require('lodash');

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//POST
module.exports.register = (req, res) => {
    let {first_name, last_name, email, password} = req.body;

    if (!utils.noEmptyParams(req.body)) res.json({success: false, message: config.messages.NO_DATA});
    else {

        const user = new User({
            first_name,
            last_name,
            email,
            password
        });

        User.isEmailUnique(email)
            .then(
                () => user.save(),
                () => {
                    res.json({success: false, message: config.messages.EMAIL_NOT_UNIQUE})
                }
            )
            .then(() => {
                res.json({success: true});
                utils.info(`User '${first_name} ${last_name}' registered!`);
            })
            .catch(error => {
                utils.error(error);
                res.json({success: false})
            });
    }
};

//POST
module.exports.login = (req, res) => {
    let {email, password} = req.body;

    if (!utils.noEmptyParams(req.body)) res.json({success: false, message: config.messages.NO_DATA});
    else
        User.findOne({email, password}, {password: 0})
            .exec()
            .then(user => {
                if (user) {
                    user = JSON.parse(JSON.stringify(user));
                    jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
                        res.json({
                            success: true,
                            user,
                            token,
                        });
                    });
                } else {
                    res.json({success: false, message: config.messages.INVALID_CREDENTIALS});
                }
            })
            .catch(error => {
                utils.error(error);
                res.json({success: false});
            });
};

//GET
module.exports.info = (req, res) => {
    /*
    We could use res.locals to serve the user data but when the data changes it will serve the old data from the JWT token
     */
    const user = res.locals.user;

    User.findById(user._id) //_id should remain the same
        .then(user => {
            utils.info(`User '${user.first_name} ${user.last_name}' got info!`);
            res.json({success: true, user});
        })
        .catch(error => {
            utils.error(error);
            res.json({success: false});
        });
};

//POST
module.exports.update = (req, res) => {
    let data = req.body;

    //remove all the dangerous fields from the request body
    data = _.reduce(data, (result, val, key) => {
        const guarded = ['_id', '__v', 'created_at']; //all the fields that are dangerous and *must* be removed from the request body
        if (guarded.indexOf(key) === -1) result[key] = val;
        return result;
    }, {});

    const user = res.locals.user;
    //set updated_at date
    const set = Object.assign(data, {'meta.updated_at': new Date});

    User.findByIdAndUpdate(user._id, {$set: set})
        .then(() => {
            utils.info(`User '${user.first_name} ${user.last_name}' updated!`);
            res.json({success: true});
        })
        .catch(error => {
            utils.error(error);
            res.json({success: false});
        });
};

module.exports.checkPassword = (req,res) => {
    const { password } = req.body;
    if(!password) res.json({success: false, message: config.messages.NO_DATA});

    User.findById(res.locals.user._id)
        .then(user => {
            res.json({success: true, match: (user.password === password)});
        })
        .catch(error => {
            utils.error(error);
            res.json({success: false});
        })
};

//DELETE
module.exports.delete = (req, res) => {
    const user = res.locals.user;

    User.findByIdAndRemove(user._id)
        .then(() => {
            utils.info(`User '${user.first_name} ${user.last_name}' deleted!`);
            res.json({success: true});
        })
        .catch(error => {
            utils.error(error);
            res.json({success: false});
        });
};