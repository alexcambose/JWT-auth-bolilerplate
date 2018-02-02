const httpMocks = require('node-mocks-http');
const assert = require('chai').assert;

const userController = require('../app/controllers/user');

function buildResponse() {
    return httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('User controller', function() {
    describe('User login', function() {
        it('No data specified error', function (done) {
            var response = buildResponse();
            var request  = httpMocks.createRequest({
                method: 'GET'
            });

            response.on('end', function() {
                assert.propertyVal(JSON.parse(response._getData()), 'success', false);
                done()
            });

            userController.login(request, response)
        });
        it('Wrong data specified error', function (done) {
            var response = buildResponse();
            var request  = httpMocks.createRequest({
                method: 'GET',
                params: {
                    email: 'some@email.com',
                    password: '123'
                }
            });

            response.on('end', function() {
                assert.propertyVal(JSON.parse(response._getData()), 'success', false);
                done()
            });

            userController.login(request, response)
        });
    });
    describe('User register', function() {
        it('No data specified error', function (done) {
            var response = buildResponse();
            var request  = httpMocks.createRequest({
                method: 'GET'
            });

            response.on('end', function() {
                assert.propertyVal(JSON.parse(response._getData()), 'success', false);
                done()
            });

            userController.register(request, response)
        });
        it('Wrong data specified error', function (done) {
            var response = buildResponse();
            var request  = httpMocks.createRequest({
                method: 'GET',
                params: {
                    email: 'some@email.com',
                    password: '123'
                }
            });

            response.on('end', function() {
                assert.propertyVal(JSON.parse(response._getData()), 'success', false);
                done()
            });

            userController.register(request, response)
        });
    });
});