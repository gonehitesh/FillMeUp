import { Button, Form, Input } from "antd";
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
      fetchCall("edititem", "PUT", values);
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
      initialValues={initialValues}
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
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea showCount maxLength={250} />
      </Form.Item>

      <Form.Item name="price" label="Price">
        <Input
          addonBefore="USD"
          style={{
            width: "100%",
          }}
          maxLength={6}
        />
      </Form.Item>

      <Form.Item name="allergies" label="Allergies">
        <Input />
      </Form.Item>

      <Form.Item name="calories" label="Calories">
        <Input />
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
