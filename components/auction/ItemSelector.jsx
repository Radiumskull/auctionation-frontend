import React from 'react'
import axios from '../../utils/axios'

const ItemSelector = () => {
  const [ items, setItems ] = React.useState([])
  const [ isLoading, setLoading ] = React.useState(false)
  React.useEffect(() => {
    const fetchItems = async () => {
      try{
        setLoading(true)
        const res = await axios.get('/players')
        if(res){
          setItems(res.data)
        }

        setLoading(false)
      } catch(err){
        setLoading(false)
      }
    }

    fetchItems()
  }, [])
  return(
    <div>
      Items
      { items && items.map(item => <div>{item.name}</div>)}
    </div>
  )
}


export default ItemSelector
