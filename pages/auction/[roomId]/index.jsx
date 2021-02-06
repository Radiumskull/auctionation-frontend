import React from 'react'
import axios from '../../../utils/axios'
import { useRouter } from 'next/router'
import { firestore } from '../../../utils/firebase'
import { useSelector } from 'react-redux'
import { Card, Row, Col } from 'antd';


//Components
import Layout from '../../../components/layout/Layout.jsx'
import Item from '../../../components/auction/Item.jsx'
import AuctionLog from '../../../components/auction/AuctionLog.jsx'
import CountdownTimer from '../../../components/auction/CountdownTimer.jsx'

const AuctionRoom = () => {
  const router = useRouter()
  const user = useSelector(state => state.user)
  const wallet = useSelector(state => state.user.wallet)
  const [ firebaseRoomId, setFirebaseRoomId ] = React.useState(null)
  const [ auctionDetails, setAuctionDetails ] = React.useState(null)
  const [ itemData, setItemData ] = React.useState(null)
  const [ bids, setBids ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)
  const roomId = router.query.roomId;

  React.useEffect(() => {
    const fetchFirebaseRoomId = async () => {
      setLoading(true)
      // console.log("Bearer " + user.auth_token)
      try{
        const res = await axios.get('/auction/room/' + roomId, {
          headers: {
            "Authorization": "Bearer " + user.auth_token
          }
        })
        setFirebaseRoomId(res.data.data.message)
      } catch(err){
      }
    }
    if(roomId) fetchFirebaseRoomId()
  }, [roomId, user.auth_token])

  React.useEffect(() => {
    if(firebaseRoomId){
      console.log(firebaseRoomId)
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      const bidsCollectionRef = docRef.collection('bids').orderBy("timestamp")
      docRef.onSnapshot((doc) => {
        if(doc.exists) setAuctionDetails(doc.data())
      })
      // console.log(bidsCollectionRef)
      bidsCollectionRef.onSnapshot((querySnapshot) => {
        let bids = []
        querySnapshot.forEach((doc) => {
          bids.push(doc.data())
          // console.log(doc.data().username)
        })
        // console.log(bids)
        setBids(bids)
      })
    }
  }, [firebaseRoomId])

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


  async function bidHandler(bidValue){
    setLoading(true)
    try{
      const res = await axios.post('/auction/room/' + firebaseRoomId, {
        bid: bidValue,
        timestamp: Date.now(),
        username: user.username
      }, { headers: { "Authorization": "Bearer " + user.auth_token }})
      console.log(res.data)
      setLoading(false)
    } catch(err){
      console.log(err)
      setLoading(false)
    }
  }
  console.log(auctionDetails)
  return(
    <Layout>
    <Row>
      { bids && auctionDetails && <CountdownTimer highest_bid={bids && bids[bids.length - 1]} endTime={auctionDetails.endTime}/>}
    </Row>
    <Row justify="center">
      <Col span={24} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        { itemData && <Item item={itemData}>
          <p><strong>Name: </strong> { itemData.name }</p>
          { itemData.team && <p><strong>Team: </strong> { itemData.team }</p>}
          { itemData.description && <p><strong>Description: </strong> { itemData.description }</p>}
        </Item> }
      </Col>
      <Col span={24}>
        <AuctionLog bids={bids} bidHandler={bidHandler} max_bid={auctionDetails && auctionDetails.max_bid} wallet={wallet} bid_input={true}/>
      </Col>
    </Row>
    </Layout>
  )
}

export default AuctionRoom
