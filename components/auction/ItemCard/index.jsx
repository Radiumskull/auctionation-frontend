import styles from './itemcard.module.css'

const ItemCard = ({ item }) => {
  const { name, team, image_url, description } = item
  return(
    <div className={styles.card}>
      <img className={styles.img} src={image_url} alt={name}/>
      <div className={styles.content}>
        <p><label>Name:</label> {name} </p>
        <p><label>Country:</label> {team} </p>
        <p>{description} </p>
      </div>
    </div>
  )
}

export default ItemCard
