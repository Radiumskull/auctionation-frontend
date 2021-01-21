const reducer = (state=null, action) => {
    switch(action.type){
        case 'user/signin':
            console.log("ACTION", action)
            return {
                ...state, 
                ...action.data
            }
        case 'user/logout':
            return action.data
        default:
            return state
    }
}


export default reducer