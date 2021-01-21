import React from 'react'
import { Layout as AntDLayout } from 'antd';
import Footer from './Footer';
import MyHeader from './Header';
import { useDispatch } from 'react-redux'
import { checkLocalUser } from '../../state/actions/user'
const Layout = ({ children }) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(checkLocalUser())
    }, [dispatch])
    return(
        <AntDLayout style={{minHeight: '100vh'}}>
            <MyHeader />
            <AntDLayout.Content>
                { children }
            </AntDLayout.Content>
            <Footer />
        </AntDLayout>
    )
}

export default Layout