import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'

import { Table } from 'antd'

export default function Home() {
  const router = useRouter()
  const auth_token = useSelector(state => state.user.auth_token)
  const [ auctions, setAuctions ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)
  React.useEffect(() => {
    const fetchAuctions = async () => {
      setLoading(true)
      try{
        const res = await axios.get('/user/auctions', {
          headers: {
            "Authorization": "Bearer " + auth_token,
            "accept": "*/*"
          }
        })
        setLoading(false)
        const tempAuctions = res.data.map(auc => {
          return {
            participants: auc.participants.length,
            auctionName: auc.auctionName,
            endTime: auc.endTime
          }
        })
        setAuctions(tempAuctions)
        console.log(tempAuctions)
      } catch(err){
        console.log(err.response.data)
      }


    }
    if(auth_token) fetchAuctions()
  }, [auth_token])


  const columns = [
    {
      title: "Auction Name",
      dataIndex: 'auctionName',
    },
    {
      title: "Participants",
      dataIndex: 'participants',
    },
    {
      title: "End Time",
      dataIndex: 'endTime',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => <Link href={`/auction/${record.auctionName}`}><a onClick={() => console.log(record.auctionName)}>Enter</a></Link>,
      responsive: ["lg"]
    },
  ]


  return (
    <Layout>
      { auctions && <Table columns={columns} dataSource={auctions} pagination={false} onRow={(record, rowIndex) => {
        return{
          onClick: () => router.push(`/auction/${record.auctionName}`)
        }
      }}/>}
    </Layout>
  )
}
