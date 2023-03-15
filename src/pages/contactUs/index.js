import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import "./contactUs.scss";
import fetchCall from "../../hooks/useFetch";
import _ from "lodash";
export default function ContactUs() {
  const { TextArea } = Input;
  const [response, setResponse] = useState(false);

  const onFinish = (values) => {
      fetchCall(
        "contactUS",
        "POST",
        values
      )
    setResponse(true);
  };

  return (
    <>
      {response && (
        <div className="alignCenter" style={{paddingTop:"20px"}}>
          <h1>Thank you! Restaurent management will contact you soon!!</h1>
        </div>
      )}
      <Form
        name="contactUs"
        onFinish={onFinish}
        scrollToFirstError
        className="contactUs-form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <div className="alignCenter">
          <h1>Contact Us</h1>
        </div>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter first name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter last name!",
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
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Mobile No"
          rules={[
            {
              pattern: /^(?:\d*)$/,
              message: "Value should contain just numbers",
            },
            {
              required: true,
              message: "please enter Phone Number!",
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
        <Form.Item
          label="Topic"
          name="subject"
          rules={[
            {
              required: true,
              message: "please select the Subject!",
            },
          ]}
        >
          <Select>
            <Select.Option value="Suggestion">Suggestion</Select.Option>
            <Select.Option value="Complain">Complain</Select.Option>
            <Select.Option value="catering">Catering</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Event Date" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Comment"
          name="context"
          rules={[
            {
              message: "Please enter your comments",
              whitespace: true,
            },
            {
              required: true,
              message: "please enter your Comments!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <div className="alignCenter">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}
