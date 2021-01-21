import axios from '../utils/axios'

export const signupWithUsernameAndPassword = async (username, password) => {
    try{
        const res = await axios.post('/auth/signup', {
            username: username,
            password: password
        })
        if(res){
            if(res.data.data.token){
                localStorage.setItem("auth_token", res.data.data.token)
            }
            return res.data
        }
    } catch(err){
        return err.response.data
    }
}

export const signinWithUsernameAndPassword = async (username, password) => {
    try{
        const res = await axios.post('/auth/login', {
            username: username,
            password: password
        })
        if(res){
            if(res.data.data.token){
                localStorage.setItem("auth_token", res.data.data.token)
            }
            return res.data
        }
    } catch(err){
        return err.response.data
    }
}