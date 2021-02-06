import React from 'react'
import styles from './auction.module.css'


const Item = ({ item, children }) => {
  const { name, team, description, image_url } = item;
  return (
    <div className={styles.item_container}>
      <img src={image_url} alt={name}/>
      <div>
        { children }
      </div>
    </div>
  )
}

export default Item
