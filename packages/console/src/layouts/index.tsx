import { useHistory, Link } from 'umi';
import { UserOutlined } from '@ant-design/icons';
////
import BasicLayout from './BasicLayout';

const Layout: React.FC = (props) => {
  const history = useHistory();
  const isFull = ['/login'].some((item: any) => history?.location?.pathname?.startsWith(item));
  return isFull ? (
    <>{props?.children}</>
  ) : (
    <BasicLayout
      menus={[
        {
          key: '/user',
          icon: <UserOutlined />,
          label: <Link to="/user">用户管理</Link>,
        },
      ]}
    >
      {props.children}
    </BasicLayout>
  );
};

export default Layout;
