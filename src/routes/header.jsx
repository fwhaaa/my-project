import { PageHeader } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const headerStyle={

   padding: '1px', 
}
const Head = () => {

  return (
    <div style={ headerStyle }>
      <PageHeader
        title='在线考试系统'
        subTitle='This is a description'
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: '。。。',
            },
            {
              path: '/',
              breadcrumbName: '。。。',
            },
          ],
        }}
        extra={
          <div>
           
          </div>
        }
      />
    </div>
  );
};

export default Head;