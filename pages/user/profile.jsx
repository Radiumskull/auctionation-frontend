import React from 'react'
import { Col, Image, Row, List, Card, Button } from 'antd'
import Layout from '../../components/layout/Layout'

const Profile =  ()  => {
    const [ userData, setUserData ] = React.useState([
        {
            label: "Email",
            value: "whoisaritra@gmail.com"
        },
        {
            label: "Phone Number",
            value: "9192631770"
        },
    ])
    return(
        <Layout>
                <Row gutter={16} justify="center">
                    <Col>
                        <Image  width={200} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" style={{borderRadius: '900px'}}/>
                        <h2 style={{fontWeight: '600'}}>Aritra Bhattacharjee</h2>
                    </Col>
                </Row>
                
                <Row gutter={16} justify="center">
                    <Col span={8}>
                            <List 
                            dataSource={userData}
                            renderItem={item => <List.Item style={{textAlign: 'center', padding: '0.30em'}}>{item.label} : {item.value}</List.Item>} />
                    </Col>
                </Row>
        
                <Row  gutter={16} justify="center">
                    <Col span={7}>
                    <Card  style={{height: '200px'}}>
                        <Row justify="space-between">
                            <Col><h2>Wallet</h2></Col>
                            <Col><Button>Add Money</Button></Col>
                        </Row>
                        <Row justify='start' style={{marginTop: '1.5em'}}>
                           <span style={{fontSize: '1.2rem', display: 'flex', alignItems: 'center'}}><h1 style={{fontSize: '3.6rem', fontWeight: 'bold', marginRight: '.25em'}}>50000</h1>INR</span>
                        </Row>
                    </Card>
                    </Col>

                    <Col span={10}>
                    <Card style={{height: '200px'}}>
                        <Row justify="space-between">
                            <Col><h2>Team</h2></Col>
                        </Row>
                        <Row justify='start' style={{marginTop: '3em'}}>
                           <span style={{fontSize: '1.2rem', display: 'flex', alignItems: 'center'}}><h1 style={{fontSize: '3rem', fontWeight: 'bold', marginRight: '.25em'}}>Mumbai Indians</h1></span>
                        </Row>
                    </Card>
                    </Col>
                </Row>

        </Layout>
    )
}

export default Profile