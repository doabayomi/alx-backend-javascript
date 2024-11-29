const sinon = require('sinon');
const { it, describe } = require('mocha');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi uses the calculateNumber method of Utils', () => {
    // Spy on the specific method calculateNumber
    const calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');

    // Call the function to test
    sendPaymentRequestToApi(200, 2);

    // Verify the spy was called with correct arguments
    expect(calculateNumberSpy.calledWith('SUM', 200, 2)).to.be.true;

    // Verify it was called exactly once
    expect(calculateNumberSpy.callCount).to.be.equal(1);

    // Restore the original method
    calculateNumberSpy.restore();
  });
});
