import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input } from '@arco-design/web-react';
import { globalContext } from '../../globalContext';
import { globalDispatchContext } from '../../globalContext';

const InputSearch = Input.Search;
function StudentList() {
  const dispatch = useContext(globalDispatchContext);
  const tasks = useContext(globalContext);
  const [data, setData] = useState(tasks);
  useEffect(()=>{
      setData(tasks)
  },[tasks])
  
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
    await dispatch(
     {
      type: 'delete',
      id: item.id
     }
    )
  }
  
  async function handleSearch(search){
    setData(tasks.filter(t => t.StudentName.includes(search)));
  }

  return (
    <div>
       <InputSearch onChange={handleSearch} allowClear placeholder='Enter keyword to search' style={{ width: 350 }} />
      
      <Table
        rowKey='id'
        columns={columns}
        data={data}
      />
      
    </div>
  );
}

export default StudentList;
