import React from 'react'
import { useRouter } from 'next/router'


const AdminPage = () => {
  const router = useRouter()
  const room_name = router.query.roomId;
  return(
    <div>
      Admin Page of Auction {room_name}
    </div>
  )
}

export default AdminPage
