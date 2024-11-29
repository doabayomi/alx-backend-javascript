const sinon = require('sinon');
const { expect } = require('chai');
const { it, describe } = require('mocha');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi uses the calculateNumber method of Utils', () => {
    const bigBro = sinon.spy(Utils);

    sendPaymentRequestToApi(200, 2);
    expect(bigBro.calculateNumber.calledWith('SUM', 200, 2)).to.be.true;
    expect(bigBro.calculateNumber.callCount).to.be.equal(1);
    bigBro.calculateNumber.restore();
  });
});
