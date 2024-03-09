import { Modal, Form  } from '@arco-design/web-react';

function CommonModal({onOk,type,handleOk,children,setConfirmLoading,confirmLoading,setVisible,visible}) {
        
  return (
     <Modal
        title={type==='edit'?'修改':'删除'}
        visible={visible}
        onOk={onOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
   >
    { type==='edit' ? children :  <p> 确认删除学生?</p> }

   </Modal>

  );
}
export default CommonModal;
