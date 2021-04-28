import { connect } from "react-redux"
import Off from "../table-offres.js"

const { default: fetchAllOffers } = require("../actions creators/offres/fetch")
const { default: fetchOffers } = require("../actions creators/offres/fetchOffers")

const mapStateToProps = state => ({
loading:state.offers.loading,
offers: state.offers.offers
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllOffers: (startupname) => {
        dispatch(fetchAllOffers(startupname))
    },
    fetchOffers:(startupname,filtre) =>{
        dispatch(fetchOffers(startupname,filtre))
    }
})

const Offre = connect(mapStateToProps, mapDispatchToProps)(Off)
export default Offre

