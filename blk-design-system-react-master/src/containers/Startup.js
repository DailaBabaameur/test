import { connect } from "react-redux"
import Tab from "../table-startups"
import fetchStartups from '../actions creators/startups/fetchStartups'

const { default: fetchAllStartups } = require("../actions creators/startups/fetch")

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

