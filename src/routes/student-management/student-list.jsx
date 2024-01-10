import { useContext, useEffect, useState, React } from 'react';
import { Table, Button, Input, Modal } from '@arco-design/web-react';
import { globalContext, globalDispatchContext } from './globalContext';

const InputSearch = Input.Search;
function StudentList() {
  const dispatch = useContext(globalDispatchContext);
  const tasks = useContext(globalContext);
  const [data, setData] = useState(tasks);
  const [visible, setVisible] = useState(false);
  const [currentRecord,setCurrentRecord] =useState(undefined);
  useEffect(()=>{
      setData(tasks)
  },[tasks])
  
  const columns = [
  
    {
      title: '学号',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '姓名',
      dataIndex: 'StudentName',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '操作',
      dataIndex: 'op',
      render: (_, record) => ( 
        <Button onClick={() =>{
          setCurrentRecord(record)
          setVisible(true)
        } 
         } type='primary' status='danger'  >
          删除
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
    setVisible(false);
  }
  
  async function handleSearch(search){
    setData(tasks.filter(t => t.StudentName.includes(search)));
  }
  
  console.log('tasks',tasks)
  return (
    <div>
       <InputSearch onChange={handleSearch} allowClear placeholder='Enter keyword to search' style={{ width: 350 }} />
      
      <Table
        rowKey='id'
        columns={columns}
        data={data}
      />
       <Modal
          title='Modal Title'
          visible={visible}
          onOk={() =>
          {        
            DeleteList(currentRecord)
          }
            }
          onCancel={() => setVisible(false)}
          autoFocus={false}
          focusLock={true}
         >
          <p>
            确认删除学生?
          </p>
        </Modal>
    </div>
  );
}

export default StudentList;
