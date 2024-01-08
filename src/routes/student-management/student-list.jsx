import { useContext, useState } from 'react';
import { Table, Empty, Button, Input } from '@arco-design/web-react';
import { globalContext } from '../../globalContext';
import { globalDispatchContext } from '../../globalContext';

const InputSearch = Input.Search;

function StudentList() {
  const dispatch = useContext(globalDispatchContext);
  const [type] = useState('checkbox');
  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  const tasks = useContext(globalContext);
  console.log('tasks: ',tasks)

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
    {
      title: 'Operation',
      dataIndex: 'op',
      render: (_, record) => (
        <Button onClick={() =>DeleteList(record) } type='primary' status='danger'>
          Delete
        </Button>
      ),
    },
  ];
  
  async function DeleteList(item){
    console.log('item',item)
    await dispatch(
     {
      type: 'delete',
      id: item.id
     }
    )
  }
  
   function handleSearch(){
    
  }

  return (
    <div>
      <InputSearch/>
      
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
