import React from 'react'
import moment from 'moment'
import axios from '../../utils/axios'
import { useRouter } from 'next/router'

import { Form, Input, InputNumber, Button, DatePicker, TimePicker, message } from 'antd';
import Layout from '../../components/layout/Layout.jsx'

const AdminPage = () => {
  const router = useRouter()
  const [ isLoading, setLoading ] = React.useState(false)
  const createAuctionHandler = async (data) => {
    try{
      setLoading(true)
        const res = await axios.post("/auction/create", data)
      setLoading(false)
      if(res){
        message.success("Auction has been created", 2, () => {
          router.push('/')
        })

      }

    } catch(err){
      console.log(err.response)
      setLoading(false)
    }


  }


  const onFinish = (values) => {
    let data = {}

    let temp = values
    const mergedTime = values.auction.date.format().split('T')[0] + "T" + values.auction.time.format().split('T')[1]
    temp['mergedTime'] = mergedTime


    data['organizerName'] = values.auction.organizer
    data['auctionName'] = values.auction.name
    data['startTime'] = moment(mergedTime).unix()
    data['participants'] = JSON.parse(values.auction.participants)
    createAuctionHandler(data)
  };
  return(
    <Layout>
    <Form name="auction_create_form" onFinish={onFinish}>
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

      <Form.Item name={['auction', 'participants']} label="Participants" rules={[ { required: true }]}>
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
