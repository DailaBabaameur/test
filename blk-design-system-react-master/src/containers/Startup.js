import { connect } from "react-redux"
import Tab from "../table-startups"
import c from '../actions/constants'
import Axios from 'axios'


const receiveStartups=()=>{
    return {
        type:c.RECEIVE_STARTUPS,
    }
}

const requestStartups=()=>{
    return {
        type:c.REQUEST_STARTUPS,
    }
}

const setStartups=(payload)=>{
    return {
        type:c.SET_STARTUPS,
        startups:payload
    }
}

const fetchAllStartups = () => {
    return (dispatch) => {
        
        dispatch(requestStartups())
        

        Axios.get('http://localhost:3003/api/all').then(
            res => {
                dispatch(setStartups(res.data))
            }
        ).then(dispatch(receiveStartups()))
            .catch(err => console.log('hnaaa'))
        

    }
}
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

const mapStateToProps = state => ({
    startups:state.startups.startups,
    loading:state.startups.loading
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllStartups: () => {
        dispatch(fetchAllStartups())
    },
    filtreStartups: (filtre) => {
        dispatch(fetchStartups(filtre))
    }
})

const Table = connect(mapStateToProps, mapDispatchToProps)(Tab)
export default Table

