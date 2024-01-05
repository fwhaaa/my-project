import { PageHeader } from '@arco-design/web-react';

const Head = () => {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: '1px' }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
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