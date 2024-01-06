import { useContext, useState } from 'react';
import { Table, Empty } from '@arco-design/web-react';
import { globalContext } from '../../globalContext';
const columns = [
  {
    title: '姓名',
    dataIndex: 'StudentName',
  },
  {
    title: '学号',
    dataIndex: 'id',
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


function StudentList() {
  const [type] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  const tasks = useContext(globalContext);
  console.log('tasks: ',tasks)
  return (
    <div>
     
      <Table
        rowKey='id'
        columns={columns}
        data={tasks}
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

export default StudentList;
