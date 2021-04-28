import requestOffers from './requestOffers'
import receiveOffers from './receiveOffers'
import setOffers from './setOffers'
import Axios from 'axios'

const fetchAllOffers = (startupname) => {

    return (dispatch) => {
        
        dispatch(requestOffers())
       
        Axios.get('http://localhost:3003/api/'+startupname+'/all').then(
            res => {
            
                dispatch(setOffers(res.data))
            }
        ).then(dispatch(receiveOffers()))
            .catch(err => console.log('hnaaa'))
    }
}

export default fetchAllOffers