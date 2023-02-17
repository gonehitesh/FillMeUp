import React, { useState } from "react";
import { Card, Descriptions, Image, Modal } from "antd";
import InfoForm from "../../../../components/Form";
import "./storeInfo.scss";

const ModifyInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storeInfo = JSON.parse(localStorage.getItem("storeInfo"));

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="storeInfo">
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="Store Information"
        extra={<div className="hyperLink" onClick={openModal}>Edit</div>}
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Manager Name">
            {storeInfo?.managerName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{storeInfo?.email}</Descriptions.Item>
          <Descriptions.Item label="Contact Number">
            {storeInfo?.contactNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {storeInfo?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Logo">
            <Image width={75} src={storeInfo?.iconPath} preview height={55} />
          </Descriptions.Item>
          <Descriptions.Item label="Additional Info">
            {storeInfo?.additionalInfo}
          </Descriptions.Item>
        </Descriptions>

        <Modal
          title="Store Info"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <InfoForm closeModal={handleCancel} initialValues={storeInfo} />
        </Modal>
      </Card>
    </div>
  );
};

export default ModifyInfo;
