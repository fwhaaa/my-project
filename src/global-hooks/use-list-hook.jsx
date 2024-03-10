import { useEffect, useState } from 'react';
import {  Message  } from '@arco-design/web-react';
import httpServer from '../routes/httpServer';

function useList({
    getListUrl,
    deleteUrl,
    editUrl,
    form,
    setVisible,
    setConfirmLoading,
    setDeleteVisible,
}) {
  const [data, setData] = useState();
  async function getList() {
    httpServer({
      url: getListUrl,
      method: 'GET'
    })
    .then((res) => {
      console.log('----res',res);
      let respData = res.data;
      if(res.status ===200 && respData.respCode ===1 ) {
        setData(res.data.results);
      }
    })
    .catch((err) => {
      console.log('err',err);
    })
  }

  async function updateList(data,url) {
    console.log(editUrl);
    httpServer({
      url,
    },data)
    .then(async (res) => {
      let respData = res.data;
      await getList();
    })
    .catch((err) => {
      console.log('err',err);
    })
  }




  useEffect(()=>{
    getList();
  },[])


  async function deleteRecord(item){
    setConfirmLoading(true);
    await updateList(item,deleteUrl);
       setTimeout(() => {
        Message.success('删除成功');
        setDeleteVisible(false);
        setConfirmLoading(false);
      }, 1500);
  }
   
  async function edit(){
    console.log(form);
    form.validate().then(async () => {
      console.log(JSON.stringify(form.getFieldsValue()));
      setConfirmLoading(true);
      await updateList(form.getFieldsValue(),editUrl);  
      setTimeout(() => {
        Message.success('编辑成功');
        setVisible(false)
        setConfirmLoading(false);
      }, 1500);
    })
  }



  return {
    deleteRecord,
    edit,
    data,
    setData
  };
}
export default useList;
