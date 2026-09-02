const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', () => {
  const convertHandler = require('../controllers/convertHandler.js');
  
  test('convertHandler should correctly read a whole number input', () => {
    const result = convertHandler.getNum('10gal');
    assert.strictEqual(result, 10);
  });
  
  test('convertHandler should correctly read a decimal number input', () => {
    const result = convertHandler.getNum('3.5kg');
    assert.strictEqual(result, 3.5);
  });
  
  test('convertHandler should correctly read a fractional input', () => {
    const result = convertHandler.getNum('1/2gal');
    assert.strictEqual(result, 0.5);
  });
  
  test('convertHandler should correctly read a fractional input with a decimal', () => {
    const result = convertHandler.getNum('3.5/2mi');
    assert.strictEqual(result, 1.75);
  });
  
  test('convertHandler should correctly return an error on a double-fraction', () => {
    const result = convertHandler.getNum('3/2/3gal');
    assert.isUndefined(result);
  });
  
  test('convertHandler should correctly default to 1 when no number', () => {
    const result = convertHandler.getNum('gal');
    assert.strictEqual(result, 1);
  });
  
  test('convertHandler should correctly read each valid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('10gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('5l'), 'l');
    assert.strictEqual(convertHandler.getUnit('3lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('7kg'), 'kg');
    assert.strictEqual(convertHandler.getUnit('2mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('9km'), 'km');
  });
  
  test('convertHandler should correctly return an error for invalid unit', () => {
    assert.strictEqual(convertHandler.getUnit('10invalid'), 'invalid unit');
  });
  
  test('convertHandler should return correct return unit', () => {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
  });
  
  test('convertHandler should return spelled-out string unit', () => {
    assert.strictEqual(convertHandler.getFullUnitName('gal'), 'gallons');
    assert.strictEqual(convertHandler.getFullUnitName('l'), 'liters');
    assert.strictEqual(convertHandler.getFullUnitName('lbs'), 'pounds');
    assert.strictEqual(convertHandler.getFullUnitName('kg'), 'kilograms');
    assert.strictEqual(convertHandler.getFullUnitName('mi'), 'miles');
    assert.strictEqual(convertHandler.getFullUnitName('km'), 'kilometers');
  });
  
  test('convertHandler should correctly convert gal to L', () => {
    const result = convertHandler.convert(1, 'gal');
    assert.closeTo(result, 3.78541, 0.01);
  });
  
  test('convertHandler should correctly convert L to gal', () => {
    const result = convertHandler.convert(1, 'l');
    assert.closeTo(result, 0.264172, 0.01);
  });
  
  test('convertHandler should correctly convert mi to km', () => {
    const result = convertHandler.convert(1, 'mi');
    assert.closeTo(result, 1.60934, 0.01);
  });
  
  test('convertHandler should correctly convert km to mi', () => {
    const result = convertHandler.convert(1, 'km');
    assert.closeTo(result, 0.621371, 0.01);
  });
  
  test('convertHandler should correctly convert lbs to kg', () => {
    const result = convertHandler.convert(1, 'lbs');
    assert.closeTo(result, 0.453592, 0.01);
  });
  
  test('convertHandler should correctly convert kg to lbs', () => {
    const result = convertHandler.convert(1, 'kg');
    assert.closeTo(result, 2.20462, 0.01);
  });
});
