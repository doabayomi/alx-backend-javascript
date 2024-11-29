const request = require('request');
const { it, describe } = require('mocha');

const { expect } = require('chai');

describe('API integration test', () => {
  const API_URL = 'http://localhost:7865';

  it('test response status code of GET/ of the API', (done) => {
    request.get(`${API_URL}/`, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('GET / returns correct response', (done) => {
    request.get(`${API_URL}/`, (err, res, body) => {
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });
});
