import React from 'react'
import moment from 'moment'

import { Form, Input, InputNumber, Button, DatePicker, TimePicker } from 'antd';
import Layout from '../../components/layout/Layout.jsx'

const AdminPage = () => {
  const onFinish = (values) => {
    let temp = values
    const mergedTime = values.auction.date.format().split('T')[0] + "T" + values.auction.time.format().split('T')[1]
    temp['mergedTime'] = mergedTime

    console.log(moment(mergedTime).unix())
  };
  return(
    <Layout>
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name={['auction', 'name']}
        label="Auction Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['auction', 'organizer']}
        label="Organizer Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['auction', 'date']}
        label="Auction Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name={['auction', 'time']}
        label="Auction Time"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TimePicker format='HH:mm'/>
      </Form.Item>

      <Form.Item name={['auction', 'description']} label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Layout>
  )
}

export default AdminPage
