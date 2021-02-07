import React from 'react'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux'

import Item from './ItemCard'

const ItemSelector = ({ firebaseRoomId }) => {
  const auth_token = useSelector(state => state.user.auth_token)
  const [ items, setItems ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)
  React.useEffect(() => {
    const fetchItems = async () => {
      try{
        setLoading(true)
        const res = await axios.get('/players')
        if(res){
          console.log(res.data)
          setItems(res.data)
        }

        setLoading(false)
      } catch(err){
        setLoading(false)
      }
    }

    fetchItems()
  }, [])
console.log(firebaseRoomId, auth_token)
  const addItemForAuction = async (itemId) => {
    setLoading(true)
    if(!firebaseRoomId || !auth_token) return
    console.log(firebaseRoomId, itemId)
    try{
      const res = axios.put('/auction/room', {
        roomId: firebaseRoomId,
        itemId: itemId
      }, { headers: { "Authorization" : "Bearer " + auth_token}})
      setLoading(false)
    } catch(err){
      console.log(err.response)
      setLoading(false)
    }
  }
  return(
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1em', placeItems: 'center'}}>
      { items && items.map(item => {
        console.log(items)
        return(
          <div onClick={() => addItemForAuction(item._id)} style={{cursor: 'pointer'}}>
            <Item item={item}/>
          </div>)
      })}
    </div>
  )
}


export default ItemSelector
