const initState = {
  auth_token: null,
  name: null
}


const reducer = (state=initState, action) => {
    switch(action.type){
        case 'user/signin':
            console.log("ACTION", action)
            return {
                ...state,
                ...action.data
            }
        case 'user/logout':
            return initState
        default:
            return state
    }
}


export default reducer
