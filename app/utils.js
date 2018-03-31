const config = require('../config');

const winston = require('winston');

winston.remove(winston.transports.Console);
if (config.winston.writeToFile) winston.add(winston.transports.File, config.winston.file);
if (config.winston.writeToConsole) winston.add(winston.transports.Console, config.winston.console);

module.exports.info = message => {
    winston.info(message);
};
module.exports.warn = message => {
    winston.warn(message);
};
module.exports.error = (message, title) => {
    winston.error((title ? `[${title}]: ` : '') + message);
};
