import React from 'react';
import { Link } from 'gatsby';

const columns = [
  {
    title: 'Title',
    key: 'title',
    sorter: (a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    },
    render: d => (
      <div>
        <Link to={`/admin/edit/#${d.id}`}>{d.title}</Link>
      </div>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    sorter: (a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    },
    render: d => <div>{d.status}</div>,
  },
  {
    title: 'Created',
    key: 'createdAt',
    sorter: (a, b) => a.createdAt - b.createdAt,
    render: d => (
      <div>
        {new Date(d.createdAt * 1000).toLocaleString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    ),
  },
  {
    title: 'Updated',
    key: 'updatedAt',
    sorter: (a, b) => a.updatedAt - b.updatedAt,
    render: d => (
      <div>
        {new Date(d.updatedAt * 1000).toLocaleString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    ),
  },
];

export default columns;
