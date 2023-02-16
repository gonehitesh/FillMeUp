import React, { useState } from "react";
import { Button, Card, Col, Descriptions, Form, Modal, Row, Tabs } from "antd";
import MenuForm from "../../../../components/MenuForm";

const ModifyMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [initialValues, setInitialValues] = useState();

  const [items, setItems] = useState([]);

  const menuItems = JSON.parse(localStorage.getItem("menuItems"));
  const categoriesList = [...new Set(menuItems?.map((item) => item.category))];
  const categories = categoriesList.map((item) => {
    return { key: item, label: item };
  });

  const addIem = () => {
    setUpdateItem(false);
    setIsModalOpen(true);
  };

  const openModal = (item) => {
    setInitialValues(item);
    setIsModalOpen(true);
    console.log("item val - ", item);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modifyItem = () => {
    setUpdateItem(true);
  };

  const handleClick = (key) => {
    if (menuItems && key) {
      const items = menuItems.filter((item) => item.category === key);
      setItems(items);
    }
  };

  return (
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Modify Menu"
    >
      <Descriptions column={1}>
        <Form>
          <Button onClick={modifyItem}>Modify Current Menu</Button>
          <Button type="primary" onClick={addIem}>
            Add New Item
          </Button>
        </Form>
      </Descriptions>
      <Modal
        title="Item Description"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <MenuForm
          closeModal={handleCancel}
          initialValues={initialValues}
          addItem={!updateItem}
        />
      </Modal>
      {updateItem && (
        <>
          <Tabs
            type="card"
            defaultActiveKey={categories[0]?.key}
            items={categories}
            onTabClick={handleClick}
            style={{ margin: "2% 0" }}
          />
          <Row style={{ padding: "10px" }}>
            {items.map((item, index) => (
              <Col
                className="gutter-row"
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                xxl={4}
                style={{ padding: "20px" }}
              >
                <Card
                  cover={
                    <img
                      alt={item?.itemName}
                      src={item?.image}
                      style={{ width: "100%", height: 170 }}
                    />
                  }
                  extra={<button onClick={() => openModal(item)}>Edit</button>}
                >
                  <Row>
                    <Col span={18}>
                      <h2>{item?.itemName}</h2>
                    </Col>
                    <Col span={6}>
                      <h2>${item?.price}</h2>
                    </Col>
                  </Row>
                  <Card.Meta
                    description={
                      <>
                        <p>{item?.description}</p>
                        <p>Allergies: {item?.allergies}</p>
                        <p>Calories: {item?.calories}</p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Card>
  );
};

export default ModifyMenu;
