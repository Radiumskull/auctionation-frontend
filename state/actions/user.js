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
            const data = {
                name: name,
                username: username,
                auth_token: res.data.data.token
            }
            localStorage.setItem("user", JSON.stringify(data))
            return {
                type: 'user/signin',
                data: data
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
                const userDataRes = await axios.get('/user', {
                  headers: { "Authorization" : "Bearer " + res.data.data.token}
                })
                if(userDataRes){
                  const data = {
                      username: username,
                      auth_token: res.data.data.token,
                      name: userDataRes.data.data.name,
                      wallet: userDataRes.data.data.wallet
                  }
                  localStorage.setItem("user", JSON.stringify(data))
                  return {
                      type: 'user/signin',
                      data: data
                  }
                } else {
                  throw Error("Cannot Fetch Userdata")
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
    localStorage.removeItem('user')
    return {
        type: 'user/logout',
        data: null
    }
}

export const checkLocalUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log("FOUND", user)
    if(user){
        return {
            type: 'user/signin',
            data: {
                ...user
            }
        }
    }

    return {
        type: 'user/dne'
    }

}
