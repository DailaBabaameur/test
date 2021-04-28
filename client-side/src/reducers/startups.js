import c from '../actions/constants'

const startups = (state = {
    loading: false,
    startups: [
        {
            name:'',
            website:''
        }
    ]
}, action) => {
    switch (action.type) {
        case c.REQUEST_STARTUPS:
            return { ...state, loading: true }
        case c.RECEIVE_STARTUPS:
            return { ...state, loading: false }
        case c.SET_STARTUPS:
            return {...state,startups:[... action.startups]}
        default:
            return state;
    }
}

export default startups