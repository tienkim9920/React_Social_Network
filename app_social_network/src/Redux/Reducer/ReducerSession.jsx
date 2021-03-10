
const initialState = {
    id_user: ''
}

const ReducerSession = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_SESSION':
            console.log("id_user: ", action.data)
            
            const stateLogin = [...state.id_user]
            stateLogin.id_user = action.data
            return stateLogin

        case 'DELETE_SESSION':
            console.log("id_user: ", action.data)
            
            const stateLogout = [...state.id_user]
            stateLogout.id_user = action.data
            return stateLogout

        default:
            return state

    }

}

export default ReducerSession