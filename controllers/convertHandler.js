class ConvertHandler {
  getNum(input) {
    const match = input.match(/^([0-9./]+)?([a-zA-Z]+)$/);
    if (!match) return undefined;
    
    let numStr = match[1] || '1';
    
    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length !== 2) return undefined;
      const num = parseFloat(parts[0]) / parseFloat(parts[1]);
      return isNaN(num) ? undefined : num;
    }
    
    const num = parseFloat(numStr);
    return isNaN(num) ? undefined : num;
  }
  
  getUnit(input) {
    const match = input.match(/^([0-9./]+)?([a-zA-Z]+)$/);
    if (!match) return 'invalid unit';
    
    const unit = match[2].toLowerCase();
    const validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    
    if (!validUnits.includes(unit)) return 'invalid unit';
    return unit;
  }
  
  getReturnUnit(unit) {
    const conversions = {
      'gal': 'L',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    return conversions[unit.toLowerCase()];
  }
  
  getFullUnitName(unit) {
    const names = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    return names[unit.toLowerCase()];
  }
  
  convert(num, unit) {
    const conversions = {
      'gal': num * 3.78541,
      'l': num / 3.78541,
      'lbs': num * 0.453592,
      'kg': num / 0.453592,
      'mi': num * 1.60934,
      'km': num / 1.60934
    };
    
    return Math.round(conversions[unit.toLowerCase()] * 100000) / 100000;
  }
}

module.exports = new ConvertHandler();
