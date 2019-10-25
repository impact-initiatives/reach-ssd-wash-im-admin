import { navigate } from 'gatsby';

import { schemaTags } from '../config/schema';
import { LIST_DOCUMENTS } from '../config/graphql';
import exports from '../config/exports';
import { getToken } from './wrap-root-element';

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

export const downloadFile = (file: string) => {
  getToken.then(accessToken => {
    fetch(exports.apollo.uri + '-files?file=' + file, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + accessToken },
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.substring(8);
        link.click();
      });
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
  let file = new File([], 'file');
  const stopLoading = () => {
    setState((state: State) => ({ ...state, loading: false }));
  };
  const tags = Object.fromEntries(
    schemaTags.filter(item => item.multiple).map(item => [item.value, []]),
  );
  const values = { ...tags, admin0: [], admin1: [], admin2: [] };
  const [year, month] = new Date().toISOString().split('-');
  for (const [key, value] of new FormData(e.currentTarget).entries()) {
    if (key === 'file') {
      if (value.size) {
        const fileName = value.name.replace(/[^\w.]/g, '_').replace(/_+/g, '_');
        values.file = `${year}/${month}/${fileName}`;
        file = value;
      }
    } else if (typeof values[key] === 'object') {
      values[key] = [...values[key], value];
    } else values[key] = value;
  }
  if (data && !values.file) values.file = data.file;
  if (file.size && data) {
    try {
      const accessToken = await getToken;
      await uploadFile(file, `${year}/${month}`, accessToken);
      try {
        await mutation({
          variables: { ...values, id: data.id },
        });
        stopLoading();
        navigate('/admin');
      } catch (e) {
        stopLoading();
      }
    } catch (e) {
      stopLoading();
    }
  } else if (file.size) {
    try {
      const accessToken = await getToken;
      await uploadFile(file, `${year}/${month}`, accessToken);
      try {
        await mutation({
          variables: { ...values },
          refetchQueries: [{ query: LIST_DOCUMENTS }],
        });
        stopLoading();
        navigate('/admin');
      } catch (e) {
        stopLoading();
      }
    } catch (e) {
      stopLoading();
    }
  } else if (data) {
    try {
      await mutation({
        variables: { ...values, id: data.id },
      });
      stopLoading();
      navigate('/admin');
    } catch (e) {
      stopLoading();
    }
  }
};

export default handleSubmit;
