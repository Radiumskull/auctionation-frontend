import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'

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
        setAuctions(res.data)
        console.log(res.data)
      } catch(err){
        console.log(err.response.data)
      }


    }
    if(auth_token) fetchAuctions()
  }, [auth_token])
  return (
    <Layout>
      { auctions.map((auction, index) => <div onClick={() => router.push(`/auction/${auction.auctionName}`)}>{auction.auctionName}</div>)}
    </Layout>
  )
}
