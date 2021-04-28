import c from '../../actions/constants'

const setStartups=(payload)=>{
    return {
        type:c.SET_STARTUPS,
        startups:payload
    }
}

export default setStartups