import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/layout/Layout'
import { logoutUser } from '../../state/actions/user'
import { Result, Button } from 'antd';
import Link from 'next/link'

const Logout = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    React.useEffect(() => {
        if(user.auth_token){
            dispatch(logoutUser())
        }
    }, [user])
    return(
        <Layout>
            <Result
                status="success"
                title="Successfully Logged Out!"
                extra={[
                <Link href="/"><Button type="primary" key="console">
                    Go Home
                </Button></Link>,
                ]}
            />
        </Layout>
    )
}

export default Logout
