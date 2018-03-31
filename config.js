module.exports = {
    port: process.env.NODE_PORT || 3000,
    mongoose: {
        Promise: require('bluebird'), //mongoose promise library
        connection: 'mongodb://localhost:27017/test',
    },
    jwt: {
        secret: 'REPLACE THIS', //secret key for jwt auth
        options: {
            expiresIn: '30 days',
            //... https://github.com/auth0/node-jsonwebtoken#usage
        },
    },
    winston: {
        writeToConsole: true, //enable writing to console
        writeToFile: true, //enable writing to file

        file: { //file writing config
            filename: `./app/logs/${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}.log`, //where the log file will be written
            json: false,
            //... for more config options see https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport
        },
        console: {
            colorize: true,
            //... for more config options see https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport
        },
    },
    errorFormatting: (param, msg, value, location) => msg, // https://github.com/ctavan/express-validator#legacy-api
};