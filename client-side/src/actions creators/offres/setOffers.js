import c from '../../actions/constants'

const setOffers=(payload)=>{
    return {
        type:c.SET_OFFERS,
        offers:payload
    }
}

export default setOffers