import React from 'react'
import { Layout as AntDLayout } from 'antd';
import Footer from './Footer';
import MyHeader from './Header';
import { useDispatch } from 'react-redux'
import { checkLocalUser } from '../../state/actions/user'
import styles from './Layout.module.css'
const Layout = ({ children }) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(checkLocalUser())
    }, [dispatch])
    return(
        <AntDLayout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <MyHeader />
            <AntDLayout.Content>
              <div className={styles.layoutBody}>
                { children }
              </div>
            </AntDLayout.Content>
            <Footer />
        </AntDLayout>
    )
}

export default Layout
