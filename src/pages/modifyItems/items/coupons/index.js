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
import CouponForm from "../../../../components/CouponForm";
import fetchCall from "../../../../hooks/useFetch";
import { CopyOutlined } from "@ant-design/icons";

const ModifyCoupons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState(true);
  const [initialValues, setInitialValues] = useState();
  const [coupons, setCoupons] = useState();

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

  const getCoupons = async () => {
    const respose = await fetchCall("getCoupons");
    setCoupons(respose);
    return respose;
  };
  
  useEffect(() => {
    getCoupons();
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
            <div className="menuButtons" style={{ justifyContent: "flex-end" }}>
              <Button type="primary" onClick={addIem}>
                Add New Item
              </Button>
            </div>
          </Form>
        </Descriptions>
        {(initialValues || !updateItem) && (
          <Modal
            title="Edit Coupons"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <CouponForm
              closeModal={handleCancel}
              initialValues={initialValues}
              addItem={!updateItem}
            />
          </Modal>
        )}
        {updateItem && (
          <>
            <Row style={{ padding: "10px" }}>
              {coupons &&
                coupons.map((item, index) => (
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
                      style={{ height: "100%" }}
                      cover={
                        <img
                          alt={item?.itemName}
                          src={item?.image}
                          style={{ width: "100%", height: 170 }}
                        />
                      }
                      extra={
                        <button onClick={() => openModal(item)}>Edit</button>
                      }
                    >
                      <Row>
                        <Col span={18}>
                          <h2>{item?.name}</h2>
                        </Col>
                        <Col span={6}>
                          <h2>${item?.price}</h2>
                        </Col>
                      </Row>
                      <Card.Meta
                        description={
                          <>
                            <p>{item?.description}</p>
                            <p>
                              Coupon Code: <b>{item?.couponCode}</b>{" "}
                              <CopyOutlined
                                className="copyIcon"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    item?.couponCode
                                  )
                                }
                              />
                            </p>
                            <p>Expire Date: { (item?.expireDate)}</p>
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

export default ModifyCoupons;
