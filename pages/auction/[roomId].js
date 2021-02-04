import React from 'react'
import Layout from '../../components/layout/Layout.jsx'
import axios from '../../utils/axios'
import { useRouter } from 'next/router'


const AuctionRoom = () => {
  const router = useRouter()
  const roomId = router.query.roomId;
  return(
    <Layout>
      Welcome to {roomId}

    </Layout>
  )
}

export default AuctionRoom
