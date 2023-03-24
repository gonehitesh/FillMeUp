import { Button, Form, Input, Select } from "antd";
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
const InfoForm = ({ closeModal, initialValues }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    fetchCall(
      "editstoreinfo",
      "PUT",
      Object.assign(values, { id: initialValues._id })
    );

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
        name="managerName"
        label="Manager Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            message: "Please enter name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="contactNumber"
        label="Phone Number"
        rules={[
          {
            pattern: /^(?:\d*)$/,
            message: "Value should contain just numbers",
          },
        ]}
      >
        <Input
          addonBefore="+1"
          style={{
            width: "100%",
          }}
          maxLength={10}
        />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input.TextArea showCount maxLength={150} />
      </Form.Item>

      <Form.Item name="iconPath" label="Logo Path">
        <Input />
      </Form.Item>

      <Form.Item name="additionalInfo" label="Additional Info">
        <Input.TextArea showCount maxLength={150} />
      </Form.Item>

      <Form.Item name="instagramUrl" label="Instagram Url">
        <Input />
      </Form.Item>

      <Form.Item name="twitterUrl" label="TwitterUrl Path">
        <Input />
      </Form.Item>

      <Form.Item name="facebookUrl" label="Facebook Url">
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
export default InfoForm;
