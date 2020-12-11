export const initialState={
    user: null,
    bid: null
}

function reducer (state, action){
    switch(action.type){
        case 'SET_USER':
            //logic to set user
            return{
                ...state,
                user: action.user
            }
        case 'SET_BID':
            return{
                ...state,
                bid: action.bid
            }
        default:
            return state
    }
}

export default reducer