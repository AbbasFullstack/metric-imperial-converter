const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert a valid input such as 10L', (done) => {
    chai.request(app)
      .get('/api/convert')
      .query({ input: '10L' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        done();
      });
  });
  
  test('Convert an invalid input such as 32g', (done) => {
    chai.request(app)
      .get('/api/convert')
      .query({ input: '32g' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid unit');
        done();
      });
  });
  
  test('Convert an invalid number such as 3/7.2/4kg', (done) => {
    chai.request(app)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid number');
        done();
      });
  });
  
  test('Convert an invalid number AND unit', (done) => {
    chai.request(app)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'invalid number and unit');
        done();
      });
  });
  
  test('Convert with no number', (done) => {
    chai.request(app)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.equal(res.body.initNum, 1);
        done();
      });
  });
});
