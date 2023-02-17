import { Button, Form, Input, InputNumber, Select } from "antd";
import fetchCall from "../../hooks/useFetch";

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
const MenuForm = ({ closeModal, initialValues, addItem }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    if (addItem) {
      fetchCall("addmenu", "POST", values);
    } else {
      fetchCall(
        "edititem",
        "PUT",
        Object.assign(values, { id: initialValues._id })
      );
    }

    closeModal();
    window.location.reload(false);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={addItem ? null : initialValues}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="itemName"
        label="Item Name"
        rules={[
          {
            message: "Please enter name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category">
        <Select>
          <Select.Option value="appetizer">Appetizers</Select.Option>
          <Select.Option value="main course">Main Course</Select.Option>
          <Select.Option value="soups">Soups</Select.Option>
          <Select.Option value="breads">Breads</Select.Option>
          <Select.Option value="sides">Sides</Select.Option>
          <Select.Option value="desserts">Desserts</Select.Option>
          <Select.Option value="beverages">Beverages</Select.Option>
        </Select>
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

      <Form.Item name="allergies" label="Allergies">
        <Input />
      </Form.Item>

      <Form.Item name="calories" label="Calories">
        <InputNumber
          style={{
            width: "100%",
          }}
          maxLength={6}
          min={0}
        />
      </Form.Item>

      <Form.Item name="image" label="Image Path">
        <Input />
      </Form.Item>

      <Button onClick={closeModal}>Cancel</Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};
export default MenuForm;
