import React from 'react'
import styles from './counter.module.css'
import CountDown from 'react-countdown'

const CountdownTimer = ({ endTime }) => {
  console.log(endTime)
  return(
    <div className={styles.countdowner}>
      <CountDown
        date={endTime}
        daysInHours={true}
        renderer={props => (
          <div className={styles.time}>
            { props.minutes > 0 && <span>{props.minutes} mins</span> }
            {" "}
            { props.seconds > 0 && <span style={{color: props.minutes === 0 ? 'red': 'black' }}>{props.seconds} secs</span> }
          </div>
        )}
      />
    </div>
  )
}


export default CountdownTimer
