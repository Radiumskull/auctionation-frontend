import React from 'react'
import axios from '../../utils/axios'
import { useRouter } from 'next/router'
import { firestore } from '../../utils/firebase'
import { useSelector } from 'react-redux'
import { useCollection } from 'react-firebase-hooks/firestore';


//Components
import Layout from '../../components/layout/Layout.jsx'
import BidInput from '../../components/room/BidInput.jsx'


const AuctionRoom = () => {
  const router = useRouter()
  const auth_token = useSelector(state => state.user.auth_token)
  const [ firebaseRoomId, setFirebaseRoomId ] = React.useState(null)
  const [ auctionDetails, setAuctionDetails ] = React.useState(null)
  const [ bids, setBids ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)
  const roomId = router.query.roomId;

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

  React.useEffect(() => {
    if(firebaseRoomId){
      console.log(firebaseRoomId)
      const docRef = firestore.collection('auction').doc(firebaseRoomId)
      const bidsCollectionRef = docRef.collection('bids')
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
          console.log(doc.data().username)
        })
        console.log(bids)
        setBids(bids)
      })
    }
  }, [firebaseRoomId])


  return(
    <Layout>
    <h1>Max Bid {auctionDetails && auctionDetails.max_bid}</h1>
      { bids && bids.map(bid => {
        return(
          <div>{bid.username} bidded Rs{bid.bid}</div>
        )
      })}
      <BidInput min={auctionDetails && auctionDetails.max_bid} max={5000} roomId={firebaseRoomId}/>
    </Layout>
  )
}

export default AuctionRoom
