import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import axios from '../../../utils/axios'
import { firestore } from '../../../utils/firebase'



import { Row, Col, Button } from 'antd'
import Layout from '../../../components/layout/Layout.jsx'
import AuctionLog from '../../../components/auction/AuctionLog.jsx'
import Item from '../../../components/auction/ItemDisplay.jsx'
import ItemSelector from '../../../components/auction/ItemSelector.jsx'

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
        setFirebaseRoomId(res.data.data.message)
        setLoading(false)
      } catch(err){
        setLoading(false)
      }
    }
    if(roomId) fetchFirebaseRoomId()
  }, [roomId, auth_token])

  //Subscribe to Auction Information
  React.useEffect(() => {
    if(firebaseRoomId){
      console.log(firebaseRoomId)
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      docRef.onSnapshot((doc) => {
        if(doc.exists) {
          setAuctionDetails(doc.data())
          setItemData(doc.data().item)
          console.log(doc.data())
        }
      })
    }
  }, [firebaseRoomId])

  //Subscribe to Bids Collection
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


  const endRoundHandler = async () => {
    console.log(auth_token);
    try{
      const res = await axios.post('/auction/room', {
        roomId: firebaseRoomId,
        itemId: itemData._id
      }, {
        headers: {
          "Authorization": "Bearer " + auth_token
        }
      })
    } catch(err){
      console.log(err.response)
    }
  }

  const endAuctionHandler = async () => {
    console.log(auth_token, firebaseRoomId);
    try{
      const res = await axios.post('/auction/end', {
        roomId: firebaseRoomId,
      }, {
        headers: {
          "Authorization": "Bearer " + auth_token
        }
      })
      console.log(res.data)
      if(res){
        router.push("/")
      }
    } catch(err){
      console.log(err)
    }
  }

  return(
    <Layout>
      { (!itemData || !auctionDetails) ? (<>
          <ItemSelector firebaseRoomId={firebaseRoomId}/>
          <Button onClick={endAuctionHandler}>End Auction</Button>
        </>
       ) : (
         <Row>
           <Col span={24}>
             { itemData && (
               <Item item={itemData}>
                 <p><strong>Name: </strong> {itemData && itemData.name}</p>
                 <p><strong>Team: </strong> {itemData && itemData.team}</p>
                 <p><strong>Description: </strong> {itemData && itemData.description}</p>
                 {"  "}
                 <Button onClick={endRoundHandler}>End Round</Button>
               </Item>
             )}
           </Col>
           <Col span={24}>
             <AuctionLog bids={bids}/>
           </Col>
         </Row>
       ) }

    </Layout>
  )
}

export default AdminPage
