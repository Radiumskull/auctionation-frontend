import axios from '../../utils/axios'


export const signupWithUsernameAndPassword = async (name, username, password) => {
    try{
        const res = await axios.post('/auth/signup', {
            name: name,
            username: username,
            password: password
        })
        if(res){
            if(res.data.data.token){
                localStorage.setItem("auth_token", res.data.data.token)
                return {
                    type: 'user/signin',
                    data: {
                        name: name,
                        username: username,
                        auth_token: res.data.data.token
                    }
                }
            }
            
        }
    } catch(err){
        return {
            type: 'user/error',
            data: {
                error: "Authentication Error"
            }
        }
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
                return {
                    type: 'user/signin',
                    data: {
                        username: username,
                        auth_token: res.data.data.token
                    }
                }
            }

        }
    } catch(err){
        return {
            type: 'user/error',
            data: {
                error: "Authentication Error"
            }
        }
    }
}

export const logoutUser = () => {
    localStorage.removeItem('auth_token')
    return {
        type: 'user/logout',
        data: null
    }
}

export const checkLocalUser = () => {
    const token = localStorage.getItem('auth_token')
    console.log("FOUND", token)
    if(token){
        return {
            type: 'user/signin',
            data: {
                auth_token: token
            }
        }
    } 
    
    return {
        type: 'user/dne'
    }
    
}