import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Modal,
  Row,
  Select,
} from "antd";
import MenuForm from "../../../../components/MenuForm";
import fetchCall from "../../../../hooks/useFetch";

const ModifyMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [initialValues, setInitialValues] = useState();
  const [menuItems, setMenuItems] = useState();
  const [items, setItems] = useState([]);

  const categoriesList = [...new Set(menuItems?.map((item) => item.category))];
  const categories = categoriesList.map((item) => {
    const label = item
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return { key: item, label };
  });

  const addIem = () => {
    setUpdateItem(false);
    setIsModalOpen(true);
  };

  const openModal = (item) => {
    setInitialValues(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setInitialValues();
    setIsModalOpen(false);
  };

  const handleClick = (key) => {
    if (menuItems && key) {
      const items = menuItems.filter((item) => item.category === key);
      setItems(items);
    }
    setUpdateItem(true);
  };

  const getMenu = async () => {
    const respose = await fetchCall("getmenu");
    setMenuItems(respose);
    return respose;
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="editItems">
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title="Modify Menu"
      >
        <Descriptions column={1}>
          <Form>
          <div className="menuButtons">
              <Select
                className="selectStyles"
                placeholder="Select a category to Modify"
                onSelect={handleClick}
              >
                {categories &&
                  categories.map((category) => (
                    <Select.Option value={category.key}>
                      {category.label}
                    </Select.Option>
                  ))}
              </Select>
              <Button type="primary" onClick={addIem}>
                Add New Item
              </Button>
            </div>
          </Form>
        </Descriptions>
        {(initialValues || !updateItem) && (
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
        )}
        {updateItem && (
          <>
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
                    style={{height: "100%"}}
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
    </div>
  );
};

export default ModifyMenu;
