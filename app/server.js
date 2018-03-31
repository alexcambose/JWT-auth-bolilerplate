const utils = require('./utils');
const config = require('../config');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator({errorFormatter: config.errorFormatting}));

app.use('/', express.static(path.resolve(__dirname, '../public'))); //serve static files
app.use('/', require('./routes/index'));

app.listen(config.port, () => {
    utils.info('App listening on port ' + config.port);
    utils.info('http://localhost:' + config.port);
});
