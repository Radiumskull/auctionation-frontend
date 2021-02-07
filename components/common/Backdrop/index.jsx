import styles from './backdrop.module.css'

import { Spin, Alert } from 'antd'


const Backdrop = ({ children, loading=true }) => {
  return(
    <div className={styles.backdrop}>
      <Spin spinning={loading} tip="Wait for the Organizer to Initiate">
      </Spin>
    </div>
  )
}


export default Backdrop
