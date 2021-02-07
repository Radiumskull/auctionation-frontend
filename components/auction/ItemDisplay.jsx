import React from 'react'
import styles from './auction.module.css'


const Item = ({ item, children }) => {
  const { name, team, description, image_url } = item;
  return (
    <div className={styles.item_container}>
      <img src={image_url} alt={name}/>
      <div>
        { children && children }
        { !children && (
          <>
            <h2>{name}</h2>
            <h2>{team}</h2>
            <p>{description}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default Item
