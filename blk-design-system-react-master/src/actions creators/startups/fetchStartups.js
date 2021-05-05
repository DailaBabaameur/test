import requestStartups from './requestStartups'
import receiveStartups from './receiveStartups'
import setStartups from './setStartups'
import Axios from 'axios'

const fetchStartups = (filtre = {
    source:0
}) => {
    return (dispatch) => {
     
        dispatch(requestStartups())
        Axios.get('http://localhost:3003/api/startups?&source=' + filtre.source )
            .then(
            res => {
                console.log(res)
                dispatch(setStartups(res.data))
            }
        ).then(dispatch(receiveStartups()))
            .catch(err => console.log(err))
    }
}

export default fetchStartups