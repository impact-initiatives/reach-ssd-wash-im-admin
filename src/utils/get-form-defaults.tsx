import React, { useRef, ChangeEvent } from 'react';
import { FaUpload } from 'react-icons/fa';

import exports from '../config/exports';
import { schemaAdmin } from '../config/schema';
import { downloadFile } from './upload-functions';

interface Props {
  defaultValue?: string;
}

interface AdminProps {
  defaultAdmin1?: string[];
  defaultAdmin2?: string[];
}

const onChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  uploadDiv: HTMLDivElement | null,
) => {
  if (e.currentTarget.files && e.currentTarget.files[0] && uploadDiv) {
    uploadDiv.innerHTML = e.currentTarget.files[0].name;
  }
};

const getLink = (defaultValue: string) => {
  if (exports.apollo.files) {
    return (
      <a href={exports.apollo.files + defaultValue}>
        {defaultValue.substring(8)}
      </a>
    );
  }
  return (
    <a href={'#' + defaultValue} onClick={() => downloadFile(defaultValue)}>
      {defaultValue.substring(8)}
    </a>
  );
};

const onCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
  if (!e.currentTarget.checked) {
    if (
      e.currentTarget.parentElement &&
      e.currentTarget.parentElement.lastChild &&
      e.currentTarget.parentElement.lastChild.childNodes
    ) {
      for (const div of Array.from(
        e.currentTarget.parentElement.lastChild.childNodes,
      )) {
        if (div.firstChild && div.firstChild.firstChild) {
          div.firstChild.firstChild.checked = false;
        }
      }
    }
  }
};

export const UploadField = ({ defaultValue }: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const uploadDiv = useRef<HTMLDivElement>(null);
  return (
    <div className="field">
      <label className="label" htmlFor="file">
        <span>File</span>
        <span className="has-text-danger"> *</span>
      </label>
      <div className="control">
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="file"
              required={!defaultValue}
              aria-required
              onChange={e => onChange(e, uploadDiv.current)}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FaUpload />
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            <span className="file-name" ref={uploadDiv}>
              {defaultValue ? getLink(defaultValue) : 'No file chosen'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export const TitleField = ({ defaultValue }: Props) => (
  <div className="field" key="title">
    <label className="label" htmlFor="title">
      <span>Title</span>
      <span className="has-text-danger"> *</span>
    </label>
    <div className="control">
      <input
        className="input"
        type="text"
        name="title"
        id="title"
        placeholder="Enter File Name"
        required
        aria-required
        defaultValue={defaultValue}
      />
    </div>
  </div>
);

export const EndDateField = ({ defaultValue }: Props) => (
  <div className="field">
    <label className="label" htmlFor="endDate">
      <span>Data End Date</span>
      <span className="has-text-danger"> *</span>
    </label>
    <div className="control">
      <input
        className="input"
        type="text"
        placeholder="YYYY-MM"
        pattern="[12]\d{3}-(0[1-9]|1[0-2])"
        name="endDate"
        id="endDate"
        required
        aria-required
        defaultValue={defaultValue}
      />
    </div>
  </div>
);

export const AdminField = ({ defaultAdmin1, defaultAdmin2 }: AdminProps) => (
  <div className="field">
    {schemaAdmin.admin0.map(admin0 => (
      <input
        type="hidden"
        name="admin0"
        key={admin0.value}
        value={admin0.value}
      />
    ))}
    <label className="label">
      <span>Admin Regions</span>
    </label>
    <div className="box">
      {schemaAdmin.admin1.map(admin1 => (
        <div key={admin1.value} className="impact-cms-nested-checkbox">
          <input
            type="checkbox"
            name="admin1"
            value={admin1.value}
            id={admin1.value}
            onChange={onCheckboxChange}
            defaultChecked={
              defaultAdmin1 && defaultAdmin1.includes(admin1.value)
            }
          />{' '}
          <label className="checkbox" htmlFor={admin1.value}>
            {admin1.label}
          </label>
          <div className="columns is-gapless is-multiline box is-shadowless">
            {schemaAdmin.admin2
              .filter(admin2 => admin2.admin1 === admin1.value)
              .map(admin2 => (
                <div className="column is-one-quarter" key={admin2.value}>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      name="admin2"
                      value={admin2.value}
                      defaultChecked={
                        defaultAdmin2 && defaultAdmin2.includes(admin2.value)
                      }
                    />{' '}
                    {admin2.label}
                  </label>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
