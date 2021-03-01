import React from 'react'
import axios from '../../../utils/axios'
import { useRouter } from 'next/router'
import { firestore } from '../../../utils/firebase'
import { useSelector } from 'react-redux'
import { Card, Row, Col, message } from 'antd';


//Components
import Layout from '../../../components/layout/Layout.jsx'
import Item from '../../../components/auction/ItemDisplay.jsx'
import AuctionLog from '../../../components/auction/AuctionLog.jsx'
import CountdownTimer from '../../../components/auction/CountdownTimer.jsx'
import Backdrop from '../../../components/common/Backdrop'

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
      console.log("HELLO", user.auth_token)
      setLoading(true)
      try{
        const res = await axios.get('/auction/room/' + roomId, {
          headers: {
            "Authorization": "Bearer " + user.auth_token
          }
        })
        setFirebaseRoomId(res.data.data.message)
        setLoading(false)
      } catch(err){
        setLoading(false)
        console.log(err)
      }
    }
    if(roomId && user.auth_token) fetchFirebaseRoomId()
  }, [roomId, user.auth_token])

  React.useEffect(() => {
    if(firebaseRoomId){
      console.log(firebaseRoomId)
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      docRef.onSnapshot((doc) => {
        if(doc.exists) {
          setAuctionDetails(doc.data())
          if(doc.data().active === false){
            router.push("/")
            message.info("The Auction has ended.")
          }
          setItemData(doc.data().item)
          console.log(doc.data())
        }
      })
    }
  }, [firebaseRoomId])

  React.useEffect(() => {
    if(itemData && itemData._id && firebaseRoomId){
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      const bidsCollectionRef = docRef.collection(itemData._id).orderBy("timestamp")
      bidsCollectionRef.onSnapshot((querySnapshot) => {
        let bids = []
        querySnapshot.forEach((doc) => {
          bids.push(doc.data())
        })
        setBids(bids)
      })
    }
  }, [itemData])

  async function bidHandler(bidValue){
    setLoading(true)
    if(auctionDetails.max_bid_user === user.username){
      message.error("Already have the highest bid");
      return
    }

    if(auctionDetails.max_bid <= bidValue){
      message.error("Place a higher bid")
      return
    }
    try{
      const res = await axios.post('/auction/room/' + firebaseRoomId, {
        itemId: itemData._id,
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
    { (!itemData || !auctionDetails || !firebaseRoomId) ? (
          <Backdrop>

          </Backdrop>
    ) : (
      <>
        <Row>
          { bids && auctionDetails && <CountdownTimer highest_bid={bids && bids[bids.length - 1]} endTime={auctionDetails.endTime} />}
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
            <AuctionLog bids={bids} bidHandler={bidHandler} max_bid={auctionDetails && auctionDetails.max_bid} wallet={wallet} bid_input={true} max_bid_user={auctionDetails.max_bid_user}/>
          </Col>
        </Row>
      </>
    ) }



    </Layout>
  )
}

export default AuctionRoom
