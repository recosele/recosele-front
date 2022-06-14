import { useHistory } from 'umi';
import { createElement } from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
////
import styles from './index.less';
import { removeUserInfo } from '@/services/useStorage';

export interface BasicLayoutProps {
  menus: any[];
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  // state
  const history = useHistory();
  const [collapsed, { toggle }] = useToggle();

  const handleLogOut = () => {
    removeUserInfo();
    window.location.reload();
  };

  return (
    <Layout className={styles['layout']}>
      <Layout.Sider
        className={styles['slider-layout']}
        width={260}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles['logo']}>
          {/* <img src={`${utils.ASSETS_URL}/images/logo.jpg`} height={32} /> */}
          {!collapsed && <span className={styles['text']}>RECOSELE</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[history?.location?.pathname]}
          defaultOpenKeys={['/cts']}
          items={props.menus}
        />
      </Layout.Sider>
      <Layout className={styles['site-layout']}>
        <Layout.Header className={styles['site-layout-background']}>
          <Row gutter={24} align="middle" justify="space-between">
            <Col>
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles['trigger'],
                onClick: toggle,
              })}
            </Col>
            <Col>
              <Button style={{ margin: '0 24px' }} onClick={handleLogOut}>
                LogOut
              </Button>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content>
          <>{props?.children}</>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
