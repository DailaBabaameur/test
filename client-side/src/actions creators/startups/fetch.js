import requestStartups from './requestStartups'
import receiveStartups from './receiveStartups'
import setStartups from './setStartups'
import Axios from 'axios'

const fetchAllStartups = () => {
    return (dispatch) => {
        console.log('ici')
        dispatch(requestStartups())
        Axios.get('http://localhost:3003/api/all').then(
            res => {
                dispatch(setStartups(res.data))
            }
        ).then(dispatch(receiveStartups()))
            .catch(err => console.log('hnaaa'))
    }
}

export default fetchAllStartups