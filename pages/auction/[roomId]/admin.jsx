import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from '../../../utils/axios'
import { firestore } from '../../../utils/firebase'
import styles from './auction.layout.css'



import { Row, Col, Button } from 'antd'
import Layout from '../../../components/layout/Layout.jsx'
import AuctionLog from '../../../components/auction/AuctionLog.jsx'

const AdminPage = () => {
  const router = useRouter()
  const roomId = router.query.roomId;

  const auth_token = useSelector(state => state.user.auth_token)
  const wallet = useSelector(state => state.user.wallet)

  const [ firebaseRoomId, setFirebaseRoomId ] = React.useState(null)
  const [ auctionDetails, setAuctionDetails ] = React.useState(null)
  const [ itemData, setItemData ] = React.useState(null)
  const [ bids, setBids ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)

  //Update Firebase RoomId
  React.useEffect(() => {
    const fetchFirebaseRoomId = async () => {
      setLoading(true)
      console.log("Bearer " + auth_token)
      try{
        const res = await axios.get('/auction/room/' + roomId, {
          headers: {
            "Authorization": "Bearer " + auth_token
          }
        })

        console.log(res.data.data)
        setFirebaseRoomId(res.data.data.message)
      } catch(err){
        console.log(err.response)
      }
    }
    if(roomId) fetchFirebaseRoomId()
  }, [roomId, auth_token])

  //Subscribe to Bids Collection
  React.useEffect(() => {
    if(firebaseRoomId){
      console.log(firebaseRoomId)
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      const bidsCollectionRef = docRef.collection('bids').orderBy("timestamp")
      // docRef.get().then((doc) => {
      //   if(doc.exists) setAuctionDetails(doc.data())
      // })
      docRef.onSnapshot((doc) => {
        if(doc.exists) setAuctionDetails(doc.data())
      })
      console.log(bidsCollectionRef)
      bidsCollectionRef.onSnapshot((querySnapshot) => {
        let bids = []
        querySnapshot.forEach((doc) => {
          bids.push(doc.data())
        })
        console.log(bids)
        setBids(bids)
      })
    }
  }, [firebaseRoomId])

  //Fetch Auction Details
  React.useEffect(() => {
    const fetchItemData = async () => {
      console.log('/players/' + auctionDetails.item_id)
      try{
        const res = await axios.get('/players/' + auctionDetails.item_id)
        console.log(res.data)
        setItemData(res.data)
      } catch(err){
        console.log(err.response)
      }
    }
    if(auctionDetails && auctionDetails.item_id) fetchItemData()
  }, [auctionDetails])

  return(
    <Layout>
      <Row>
        <Col span={24} lg={6}>
          <img alt="example" src={itemData && itemData.image_url } style={{height: '100%', width: '100%', objectFit: 'contain', maxHeight: '400px'}}/>
          <div style={{marginTop: '1em'}}>
            <p><strong>Name: </strong> {itemData && itemData.name}</p>
            <p><strong>Team: </strong> {itemData && itemData.team}</p>
            <p><strong>Description: </strong> {itemData && itemData.description}</p>

            <Button>End Auction</Button>
          </div>

        </Col>
        <Col span={24} md={18}>
          <AuctionLog bids={bids}/>
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminPage
