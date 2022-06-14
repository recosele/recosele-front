import { useState } from 'react';
import { Descriptions, Tag, Modal, Space, Button } from 'antd';

export const verifyStatus = [
  { value: '0', label: '未审核', color: '' },
  { value: '1', label: '审核中', color: '#faad14' },
  { value: '2', label: '审核成功', color: '#48c78e' },
  { value: '3', label: '审核失败', color: '#f14668' },
];

export interface WaybillProps {
  updateUserAPI?: any;
  dataSource: API.User;
}

const Waybill: React.FC<WaybillProps> = (props) => {
  // state
  const [visible, setVisible] = useState(false);
  // action
  function handleOpen() {
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  async function handlePass() {
    await props?.updateUserAPI?.runAsync({
      userId: props?.dataSource?._id,
      verify_status: '2',
    });
  }
  async function handleUnPass() {
    await props?.updateUserAPI?.runAsync({
      userId: props?.dataSource?._id,
      verify_status: '3',
    });
  }
  // data format
  const status = verifyStatus[+(props?.dataSource?.verify_status || 0)];

  return (
    <>
      <Modal
        title="用户审核"
        width={800}
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Space>
            <Button loading={props?.updateUserAPI?.loading} type="primary" onClick={handlePass}>
              审核成功
            </Button>
            <Button
              loading={props?.updateUserAPI?.loading}
              type="primary"
              danger
              onClick={handleUnPass}
            >
              审核失败
            </Button>
          </Space>
        }
      >
        <Descriptions title="用户信息" column={3}>
          <Descriptions.Item label="审核状态">
            <Tag color={status.color}>{status.label}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="微信ID">{props?.dataSource?.userId}</Descriptions.Item>
          <Descriptions.Item label="用户名">{props?.dataSource?.name}</Descriptions.Item>
        </Descriptions>
        <div style={{ height: 'calc(100vh - 400px)', overflow: 'auto' }}>
          <Descriptions title="证件照" column={1} bordered>
            <Descriptions.Item label="证件正面1">
              <img src={props?.dataSource?.front_img1} height={300} width={400} />
            </Descriptions.Item>
            <Descriptions.Item label="证件正面2">
              <img src={props?.dataSource?.front_img2} height={300} width={400} />
            </Descriptions.Item>
            <Descriptions.Item label="证件背面">
              <img src={props?.dataSource?.back_img} height={300} width={400} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="用户照" column={1} bordered>
            <Descriptions.Item label="正脸照片">
              <img src={props?.dataSource?.face_img} height={300} width={400} />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Modal>
      <Button onClick={handleOpen}>审核</Button>
    </>
  );
};

export default Waybill;
