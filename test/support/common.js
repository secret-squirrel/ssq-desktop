process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
var Q = require('q')

chai.should()
chai.use(chaiAsPromised)

global.chaiAsPromised = chaiAsPromised
global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert

global.fulfilledPromise = Q.resolve
global.rejectedPromise = Q.reject
global.defer = Q.defer
