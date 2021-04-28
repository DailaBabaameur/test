import App from './App'
import Table from './table-startups'
import OFFRE from './table-offres'
import {Route, Router} from 'react-router'

const routes=(
    <Route path="/" component={App} >
        <Route path="/startups" component={Table}></Route>
        <Route path="/offre" component={OFFRE}></Route>

    </Route>
)
export default routes;