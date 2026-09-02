const express = require('express');
const app = express();
const convertHandler = require('./controllers/convertHandler.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  
  if (!input) {
    return res.json({ error: 'no input' });
  }
  
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);
  
  if (initNum === undefined && initUnit === 'invalid unit') {
    return res.json({ error: 'invalid number and unit' });
  }
  
  if (initNum === undefined) {
    return res.json({ error: 'invalid number' });
  }
  
  if (initUnit === 'invalid unit') {
    return res.json({ error: 'invalid unit' });
  }
  
  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const initUnitString = convertHandler.getFullUnitName(initUnit);
  const returnUnitString = convertHandler.getFullUnitName(returnUnit);
  
  const string = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  
  res.json({
    initNum: initNum,
    initUnit: initUnit.toLowerCase(),
    returnNum: returnNum,
    returnUnit: returnUnit.toLowerCase(),
    string: string
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
