import schema, { schemaHidden } from '../config/schema';
import exports from '../config/exports';
import { getToken } from './wrap-root-element';

interface Values {
  [key: string]: string | string[];
}

interface State {
  loading: boolean;
  admin: boolean;
}

const uploadFile = (file: File, subfolder: string, accessToken: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('subfolder', subfolder);
  return fetch(exports.apollo.uri + '-files', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken },
    body: formData,
  });
};

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  setState: Function,
  mutation: Function,
  data?: Data,
) => {
  e.preventDefault();
  setState((state: State) => ({ ...state, loading: true }));
  let file: File = {
    lastModified: 0,
    name: '',
    size: 0,
    type: '',
    slice: new Blob().slice,
  };
  const values: Values = {};
  const date = new Date();
  const year = date.toISOString().slice(0, 4);
  const month = date.toISOString().slice(5, 7);
  for (const input of Array.from(e.currentTarget.elements)) {
    const {
      name,
      value,
      multiple,
      files,
      selectedOptions,
    } = input as HTMLFormElement;
    if (name && !multiple && !files) values[name] = value;
    if (name && !multiple && files) file = files[0];
    if (name && multiple && selectedOptions) {
      const options = [];
      for (const option of selectedOptions) {
        options.push(option.value);
        if (
          schema.selectMultipleGrouped[name] &&
          schema.selectMultipleGrouped[name].submit
        ) {
          const parents =
            schema.selectMultipleGrouped[name].submit[option.value];
          for (const [parentKey, parentValue] of Object.entries(parents)) {
            const parentValues = new Set([...values[parentKey], parentValue]);
            values[parentKey] = Array.from(parentValues)
              .filter(Boolean)
              .sort();
          }
        }
      }
      if (values[name]) {
        const mergedValues = new Set([...values[name], ...options]);
        values[name] = Array.from(mergedValues)
          .filter(Boolean)
          .sort();
      } else {
        values[name] = options.filter(Boolean).sort();
      }
    }
  }
  if (file && data) {
    values.file = `${year}/${month}/${file.name}`;
    try {
      const accessToken = await getToken;
      await uploadFile(file, `${year}/${month}`, accessToken);
      try {
        await mutation({
          variables: { ...schemaHidden, ...values, id: data.id },
        });
        setState((state: State) => ({ ...state, loading: false }));
        window.location.assign('/admin');
      } catch (e) {
        setState((state: State) => ({ ...state, loading: false }));
      }
    } catch (e) {
      setState((state: State) => ({ ...state, loading: false }));
    }
  } else if (file) {
    values.file = `${year}/${month}/${file.name}`;
    try {
      const accessToken = await getToken;
      await uploadFile(file, `${year}/${month}`, accessToken);
      try {
        await mutation({ variables: { ...schemaHidden, ...values } });
        setState((state: State) => ({ ...state, loading: false }));
        window.location.assign('/admin');
      } catch (e) {
        setState((state: State) => ({ ...state, loading: false }));
      }
    } catch (e) {
      setState((state: State) => ({ ...state, loading: false }));
    }
  } else if (data) {
    values.file = data.file;
    try {
      await mutation({
        variables: { ...schemaHidden, ...values, id: data.id },
      });
      setState((state: State) => ({ ...state, loading: false }));
      window.location.assign('/admin');
    } catch (e) {
      setState((state: State) => ({ ...state, loading: false }));
    }
  }
};

export default handleSubmit;
