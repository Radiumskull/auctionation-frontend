import React from 'react'
import { InputNumber, Button, message } from 'antd'
import styles from './auction.module.css'
import moment from 'moment'


const AuctionLog = ({ bids, bid_input=false, max_bid, wallet, bidHandler }) => {
  const [ bidValue, setBidValue ] = React.useState(null)

  React.useEffect(() => {
    setBidValue(max_bid + 1)
  }, [max_bid])

  const onChangeHandler = (event) => {
    const value = event.target.value;
    setBidValue(value)
    console.log(bidValue)
  }

  const onSubmitHandler = () => {
    console.log(bidValue, max_bid, wallet)
    if(bidValue < max_bid){
      console.log("Bhak Gareeb!")
      message.error("Bhak Gareeb!")
      return
    } else if(bidValue > wallet){
      message.error("Aukaat me Reh!")
      console.log("Aukaat me Reh!")
      return
    } else {
      bidHandler(bidValue)
    }
  }
  return(
    <div className={styles.logContainer}>
        <div className={styles.logs}>
        { bids && bids.map((bid,index) => {
          return(
            <div key={index}>{bid.name} bidded Rs{bid.bid}<span>{moment(bid.timestamp).startOf('milisecond').fromNow()}</span></div>
          )
        })}
        </div>
        { bid_input &&  (
          <div className={styles.bidInput}>
            <input type="number" max={wallet} min={max_bid + 1} onChange={onChangeHandler}/>
            <Button type="primary" style={{minWidth: '80px'}} onClick={onSubmitHandler}>Bid</Button>
          </div>)
        }

      </div>

  )
}


export default AuctionLog
