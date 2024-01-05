import { useState } from 'react';
import { Table, Empty  } from '@arco-design/web-react';
const columns = [
  {
    title: '姓名',
    dataIndex: 'TeacherName',
  },
  {
    title: '教师编号',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = [
 
];

function TeachertList() {
  const [type ] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  return (
    <div>
      <Table
        rowKey='id'
        columns={columns}
        data={data}
        rowSelection={{
          type,
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('onChange:', selectedRowKeys, selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
          onSelect: (selected, record, selectedRows) => {
            console.log('onSelect:', selected, record, selectedRows);
          },
          checkboxProps: (record) => {
            return {
              disabled: record.id === '4',
            };
          },
        }}
      />
    </div>
  );
}

export default TeachertList;
