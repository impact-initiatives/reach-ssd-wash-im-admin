import config from '../config/schema/schema.js';

const selectFields = ['select-one', 'select-multiple', 'select-one-admin'];

const getLabels = documents => {
  return documents.map(node => {
    return Object.entries(node)
      .map(entry => mapEntries(entry))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {},
      );
  });
};

const mapEntries = ([key, value]) => {
  const fieldType = config[key] ? config[key].type : '';
  if (Array.isArray(value)) {
    const newValue = value.map(value2 => {
      if (selectFields.includes(fieldType)) {
        return config[key].options[value2];
      }
      return value2;
    });
    return [key, newValue];
  }
  if (selectFields.includes(fieldType)) {
    return [key, config[key].options[value]];
  }
  return [key, value];
};

export default getLabels;
