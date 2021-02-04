import React from 'react'
import { InputNumber, Button } from 'antd';
import axios from '../../utils/axios'
import {serverTimestamp} from '../../utils/firebase'
import { useSelector } from 'react-redux'


const BidInput = ({ min, max, roomId }) => {
  const user = useSelector(state => state.user)
  const [ bidValue, setBidValue ] = React.useState(min+1)
  const [ loading, setLoading ] = React.useState(false)
  function onChange(value) {
    setBidValue(value)
  }

  const bidHandler = async () => {
    setLoading(true)
    console.log(serverTimestamp().toString())
    try{
      const res = await axios.post('/auction/room/' + roomId, {
        bid: bidValue,
        timestamp: Date.now(),
        username: user.username
      }, { headers: { "Authorization": "Bearer " + user.auth_token }})
      console.log(res.data)
      setBidValue(bidValue + 1)
      setLoading(false)
    } catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  return(
    <>
    <InputNumber min={min + 1} max={max} value={bidValue} onChange={onChange} disabled={loading}/>
    <Button onClick={bidHandler}>Bid Handler</Button>
    </>
  )
}


export default BidInput
