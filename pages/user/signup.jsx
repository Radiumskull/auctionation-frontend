import React from 'react'
import Layout from "../../components/layout/Layout"
import { Form, Input, Button, Card } from 'antd'
import Password from "antd/lib/input/Password";
import { useDispatch, useSelector } from 'react-redux'
import { signupWithUsernameAndPassword } from '../../state/actions/user'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignUp = () => {
    const user = useSelector(state => state.user)
    const router = useRouter()
    React.useEffect(() => {
        console.log(user)
        if(user.auth_token){
            router.push('/')
        }
    }, [user])

    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const [ formData, setFormData ] = React.useState({
        name: null,
        username: null,
        password: null
    })

    const onChangeHandler = (e) => {
      switch(e.target.name){
        case 'name':
            setFormData({...formData, name: e.target.value})
            break
        case 'username':
          setFormData({...formData, username: e.target.value})
          break
        case 'password':
          setFormData({...formData, password: e.target.value})
          break
        default:
          break
      }
      console.log(formData)
    }

    const onSubmitHandler = async () => {
        dispatch(await signupWithUsernameAndPassword(formData.name, formData.username, formData.password))
    }

    return(
      <Layout>
        <Card style={{maxWidth: '400px', margin: '10% auto'}} >
          <Form form={form} layout="vertical" onFinish={onSubmitHandler}>
            <h2 style={{textAlign: 'center'}}>Sign Up</h2>
            <Form.Item label="Name">
              <Input placeholder="John Doe"
                name="name"
                onChange={onChangeHandler}
                rules={[
                  {
                    required: formData.username,
                    message: 'Please input your email',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input placeholder="example@gmail.com"
                name="username"
                onChange={onChangeHandler}
                rules={[
                  {
                    required: formData.username,
                    message: 'Please input your email',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Password placeholder="a strong password" name="password"
              onChange={onChangeHandler}
              rules={[
                {
                  required: formData.password,
                  message: 'Please input your password',
                },
              ]}
              />
            </Form.Item>
            <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
          <p>Already an user? <Link href="/user/signin">Login</Link></p>
        </Card>
      </Layout>
    )
}

export default SignUp
