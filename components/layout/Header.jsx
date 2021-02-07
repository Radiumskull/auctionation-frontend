import React from 'react'
import { useSelector } from 'react-redux'
import { Layout, Menu, Button, Grid, Drawer } from 'antd';
import styles from './Layout.module.css'
import { useRouter } from 'next/router'
const { useBreakpoint } = Grid;
import Link from 'next/link'

const { Header } = Layout;


const AucHeader = () => {
    const [ open, setOpen ] = React.useState(false)
    const screens = useBreakpoint()
    const user = useSelector(state => state.user)
    const router = useRouter()
    const onClickHandler = ({ item, key }) => {
        router.push(key)
    }
    // console.log(screens)
    return(
        <Header className={styles.navbar}>
            <h1 className={styles.brand}>Auctionation</h1>
            { screens.md ? (
              <Menu theme="dark" mode="horizontal" style={{float: 'right'}} selectable={false} onClick={onClickHandler}>
                  <Menu.Item key="/">Home</Menu.Item>
                  <Menu.Item key="/docs">Docs</Menu.Item>
                  { user.auth_token ? <Menu.Item key="/user/logout">Logout</Menu.Item> : <Menu.Item key="/user/signup">Register</Menu.Item>}
              </Menu>
            ) : (
              <div style={{float: 'right', display: 'flex', alignItems: 'center', height: '100%'}}>
                <div onClick={() => setOpen(true)} style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                  <svg width="48" height="18" viewBox="0 0 48 35" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}>
                    <rect width="48" height="6" rx="3" fill="#C4C4C4"/>
                    <rect y="14" width="48" height="6" rx="3" fill="#C4C4C4"/>
                    <rect y="29" width="48" height="6" rx="3" fill="#C4C4C4"/>
                  </svg>
                </div>
              </div>
            )}

            <Drawer
              title="Auctionation"
              placement="right"
              closable={false}
              onClose={() => setOpen(false)}
              visible={open}
              key="right"
            >
              <div><Link href="/" onClick={() => setOpen(false)}><a>Home</a></Link></div>
              <div><Link href="/docs" onClick={() => setOpen(false)}><a>Docs</a></Link></div>
              <div><Link href="/user/logout" onClick={() => setOpen(false)}><a>Logout</a></Link></div>
            </Drawer>



      </Header>
    )
}

export default AucHeader
