import { useContext, useEffect, useState } from 'react';
import { Table, Button, Input,  } from '@arco-design/web-react';
import { globalDispatchContext, globalContext } from './globalContext';

const InputSearch = Input.Search;
function TeachertList() {
  const dispatch = useContext(globalDispatchContext);
  const tasks = useContext(globalContext);
  const [data, setData] = useState(tasks);
  useEffect(()=>{
      setData(tasks)
  },[tasks])
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'TeacherName',
    },
    {
      title: '教师编号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
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
    setData(tasks.filter(t => t.TeacherName.includes(search)));
  }

  console.log('',data);
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
export default TeachertList;
