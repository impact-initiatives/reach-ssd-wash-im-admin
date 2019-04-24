import { Storage } from 'aws-amplify';

const customRequest = ({ onSuccess, onProgress, onError, file }) => {
  const year = new Date().toISOString().slice(0, 4);
  const month = new Date().toISOString().slice(5, 7);
  Storage.put(`${year}/${month}/${file.name}`, file, {
    contentType: file.type,
    customPrefix: { public: 'files/' },
    progressCallback({ loaded, total }) {
      onProgress({ percent: (loaded / total) * 100 });
    },
  })
    .then(result => onSuccess(result))
    .catch(onError);
};

const onChange = file => {
  const { status } = file.file;
  if (status === 'done') {
  } else if (status === 'error') {
  }
};

export { customRequest, onChange };
