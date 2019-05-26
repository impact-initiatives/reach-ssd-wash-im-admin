import React, { useState } from 'react';

// import columns from '../config/table-columns/table-columns-files';
import schema from '../config/schema/schema';
import getFilterType from '../utils/get-filter-type';

const FileTable = ({ edges }) => {
  const [state, setState] = useState({ edges, filters: {} });
  return (
    <div>
      <div>
        {Object.entries(schema).map(([key, value]) => {
          return getFilterType(
            edges,
            { ...value, value: key },
            state,
            setState,
          );
        })}
      </div>
      {/*<Table*/}
      {/*  rowKey={r => r.created}*/}
      {/*  columns={columns}*/}
      {/*  dataSource={state.edges}*/}
      {/*  pagination={{ simple: true, defaultPageSize: 20 }}*/}
      {/*/>*/}
    </div>
  );
};

export default FileTable;
