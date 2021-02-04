import React from 'react'
import Layout from "../../components/layout/Layout"
import { Form, Input, Button, Card } from 'antd'
import Password from "antd/lib/input/Password";
import { useDispatch, useSelector } from 'react-redux'
import { signinWithUsernameAndPassword } from '../../state/actions/user'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignIn = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector(state => state.user)
    React.useEffect(() => {
      console.log(user)
      if(user.auth_token){
          router.push('/')
      }
  }, [user])
    const [ formData, setFormData ] = React.useState({
      username: null,
      password: null
    })

    const onChangeHandler = (e) => {
      switch(e.target.name){
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
        dispatch(await signinWithUsernameAndPassword(formData.username, formData.password))
    }

    return(
      <Layout>
        <Card style={{maxWidth: '400px', margin: '10% auto'}} >
          <Form form={form} layout="vertical" onFinish={onSubmitHandler}>
            <h2 style={{textAlign: 'center'}}>Login</h2>
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
          <p>Not registered? <Link href="/user/signup">Register</Link></p>
        </Card>
      </Layout>
    )
}

export default SignIn
