import c from '../actions/constants'

const offers = (state = {
    loading: false,
    offers: []
}, action) => {
    switch (action.type) {
        case c.REQUEST_OFFERS:
            return { ...state, loading: true }
        case c.RECEIVE_OFFERS:
            return { ...state, loading: false }
        case c.SET_OFFERS:
            return {...state,offers:[... action.offers]}
        default:
            return state;
    }
}

export default offers