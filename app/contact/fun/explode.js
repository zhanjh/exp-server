const explode = (input, delimiter = ',') => {
  delimiter = delimiter || ',';
  if (typeof input === 'string') {
    return input.split(delimiter).map(item => item.trim());
  }
  if (Array.isArray(input)) {
    return input;
  }

  return [];
};

module.exports = explode;
