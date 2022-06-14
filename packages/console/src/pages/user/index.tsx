import { Form, Table, Input, Button, Row, Col, Card, Space, Tag, Select } from 'antd';
import { useAntdTable, useRequest } from 'ahooks';
////
import { getAllUsers, updateUser } from '@/services/request/user';
import CheckModal, { verifyStatus } from './components/CheckModal';

const StatusInquiry: React.FC = () => {
  // state
  const [form] = Form.useForm();

  // api
  const getTableData = async (pageData: any, formData: any) => {
    const page = pageData.current - 1;
    const perPage = pageData.pageSize;
    let sorter: any = {};
    if (typeof pageData?.sorter?.field === 'string') {
      sorter.sortField = pageData?.sorter?.field;
    } else if (Array.isArray(pageData?.sorter?.field)) {
      sorter.sortField = pageData?.sorter?.field?.join('.');
    } else {
      sorter.sortField = 'createAt';
    }
    if (pageData?.sorter?.order === 'ascend') {
      sorter.sortOrder = 1;
    }
    if (pageData?.sorter?.order === 'descend') {
      sorter.sortOrder = -1;
    }
    const data = await getAllUsers({
      page,
      perPage,
      ...sorter,
      ...formData,
    });
    return { total: data?.totalCount, list: data?.users || [] };
  };
  const { tableProps, search, refresh } = useAntdTable(getTableData, { form });

  const updateUserAPI = useRequest(updateUser, {
    manual: true,
    onSuccess: () => {
      refresh();
    },
  });

  return (
    <Card title="用户管理">
      <Form form={form}>
        <Row justify="end" gutter={16}>
          <Col flex="160px">
            <Form.Item name="verify_status">
              <Select placeholder="审核状态" options={verifyStatus} allowClear />
            </Form.Item>
          </Col>
          <Col flex="200px">
            <Form.Item name="userId">
              <Input placeholder="微信ID" />
            </Form.Item>
          </Col>
          <Col flex="200px">
            <Form.Item name="name">
              <Input placeholder="用户名" />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type="primary" onClick={search.submit}>
                搜索
              </Button>
              <Button onClick={search.reset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table rowKey="_id" {...tableProps}>
        <Table.Column
          sorter
          width={100}
          title="审核状态"
          dataIndex="verify_status"
          render={(v) => <Tag color={verifyStatus[v].color}>{verifyStatus[v].label}</Tag>}
        />
        <Table.Column sorter width={150} title="微信ID" dataIndex="userId" />
        <Table.Column sorter width={800} title="用户名" dataIndex="name" />
        <Table.Column
          width={100}
          title="操作"
          render={(row) => <CheckModal updateUserAPI={updateUserAPI} dataSource={row} />}
        />
      </Table>
    </Card>
  );
};

export default StatusInquiry;
