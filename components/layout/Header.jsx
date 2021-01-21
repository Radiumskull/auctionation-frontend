import React from 'react'
import { useSelector } from 'react-redux'
import { Layout, Menu, Button } from 'antd';
import styles from './Layout.module.css'
import { useRouter } from 'next/router'


const { Header } = Layout;


const AucHeader = () => {
    const user = useSelector(state => state.user)
    const router = useRouter()
    const onClickHandler = ({ item, key }) => {
        console.log("HEllo")
        router.push(key)
    }

    return(
        <Header>
            <h1 className={styles.brand}>Auctionation</h1>
            <Menu theme="dark" mode="horizontal" style={{float: 'right'}} selectable={false} onClick={onClickHandler}>
                <Menu.Item key="/">Home</Menu.Item>
                <Menu.Item key="/docs">Docs</Menu.Item>
                { user ? <Menu.Item key="/user/logout">Logout</Menu.Item> : <Menu.Item key="/user/signup">Register</Menu.Item>}
            </Menu>
      </Header>
    )
}

export default AucHeader