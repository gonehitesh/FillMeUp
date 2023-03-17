import { useState } from "react";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import fetchCall from "../../hooks/useFetch";
import dayjs from "dayjs";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const CouponForm = ({ closeModal, initialValues, addItem }) => {
  const [form] = Form.useForm();
  const [formatedDate, setDate] = useState();

  const onFinish = (values) => {
    if (addItem) {
      fetchCall(
        "addCoupons",
        "POST",
        Object.assign(values, { expireDate: formatedDate })
      );
    } else {
      console.log(initialValues, values);
      fetchCall(
        "editCoupons",
        "PUT",
        Object.assign(values, {
          id: initialValues._id,
          expireDate: formatedDate,
        })
      );
    }

    closeModal();
    window.location.reload(false);
  };

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="model"
      onFinish={onFinish}
      initialValues={
        addItem
          ? null
          : Object.assign(initialValues, {
              expireDate: dayjs(initialValues.expireDate, "MM/DD/YYYY"),
            })
      }
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            message: "Please enter name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea showCount maxLength={250} />
      </Form.Item>

      <Form.Item name="price" label="Price">
        <InputNumber
          addonBefore="USD"
          style={{
            width: "100%",
          }}
          maxLength={6}
          min={0}
          controls={false}
        />
      </Form.Item>

      <Form.Item name="couponCode" label="Coupon Code">
        <Input />
      </Form.Item>

      <Form.Item name="offerOver" label="Apply offer over price">
        <InputNumber
          style={{
            width: "100%",
          }}
          maxLength={6}
          min={0}
        />
      </Form.Item>

      <Form.Item name="expireDate" label="Expire Date">
        <DatePicker onChange={onChange} format="MM/DD/YYYY"/>
      </Form.Item>

      <Form.Item name="image" label="Image Path">
        <Input />
      </Form.Item>
      <div className="modelButtons">
        <Button onClick={closeModal}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
export default CouponForm;
