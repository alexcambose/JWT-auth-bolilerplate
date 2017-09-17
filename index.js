const config = require('./config');
const utils = require('./app/utils');

const mongoose = require('mongoose');

mongoose.Promise = config.mongoose.Promise;

mongoose.connect(config.mongoose.connection, {useMongoClient: true})
    .then(() => {
        utils.info('Connected to mongodb!');
        require('./app/server.js');
    })
    .catch(err => {
        utils.error(err.message, err.name);
    });

