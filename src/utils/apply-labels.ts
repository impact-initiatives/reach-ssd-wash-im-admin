import { schemaTags, schemaAdmin } from '../config/schema';

const applyLabels = (documents: Data[]): LabeledData[] =>
  documents.map(node =>
    Object.fromEntries(Object.entries(node).map(mapEntries)),
  );

const mapEntries = ([key, value]: [string, DataProp]): [
  string,
  LabeledDataProp,
] => {
  if (['admin0', 'admin1', 'admin2'].includes(key)) {
    const labeledValue = value.map(item =>
      schemaAdmin[key].find(option => option.value === item),
    );
    return [key, labeledValue];
  }
  const tag = schemaTags.find(item => item.value === key);
  if (tag) {
    if (typeof value === 'string') {
      const labeledValue = tag.options.find(option => option.value === value);
      return [key, labeledValue];
    }
    if (typeof value === 'object') {
      const labeledValue = value.map(item =>
        tag.options.find(option => option.value === item),
      );
      return [key, labeledValue];
    }
  }
  return [key, value];
};

export default applyLabels;
