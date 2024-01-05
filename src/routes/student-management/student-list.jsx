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
// const data = [
//   {
//     id: '1',
//     StudentName: 'Jane Doe',
//     salary: 23000,
//     address: '32 Park Road, London',
//     email: 'jane.doe@example.com',
//   },
//   {
//     id: '2',
//     StudentName: 'Alisa Ross',
//     salary: 25000,
//     address: '35 Park Road, London',
//     email: 'alisa.ross@example.com',
//   },
//   {
//     id: '3',
//     StudentName: 'Kevin Sandra',
//     salary: 22000,
//     address: '31 Park Road, London',
//     email: 'kevin.sandra@example.com',
//   },
//   {
//     id: '4',
//     StudentName: 'Ed Hellen',
//     salary: 17000,
//     address: '42 Park Road, London',  
//     email: 'ed.hellen@example.com',
//   },
//   {
//     id: '5',
//     StudentName: 'William Smith',
//     salary: 27000,
//     address: '62 Park Road, London',
//     email: 'william.smith@example.com',
//   },
 


// ];

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
