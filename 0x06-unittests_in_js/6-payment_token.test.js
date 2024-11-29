const chai = require('chai');
const { it, describe } = require('mocha');

const getPaymentTokenFromAPI = require('./6-payment_token');

const { expect } = chai;

describe('getPaymentTokenFromAPI', () => {
  it('it should return an instance of a Promise', () => {
    const res = getPaymentTokenFromAPI();
    expect(res).to.be.an.instanceof(Promise);
  });

  it('getPaymentTokenFromAPI(success), where success == true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((res) => {
        expect(res).to.deep.equal({ data: 'Successful response from the API' });
        done();
      });
  });

  it('it should do nothing when not success', () => {
    getPaymentTokenFromAPI(false)
      .then((res) => {
        expect(res).to.equal('');
      });
  });
});
