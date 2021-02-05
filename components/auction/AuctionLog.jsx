import React from 'react'
import styles from './Auction.module.css'
import moment from 'moment'


const AuctionLog = ({ bids }) => {
  return(
    <div className={styles.logContainer}>
    { bids && bids.map((bid,index) => {
      return(
        <div key={index}>{bid.name} bidded Rs{bid.bid}<span>{moment(bid.timestamp).startOf('milisecond').fromNow()}</span></div>
      )
    })}
    </div>
  )
}


export default AuctionLog
