import React from 'react';
import Badges from '../pages/Badges';
import BadgeNew from '../pages/BadgeNew';
import NotFound from '../pages/NotFound';
import Layout from './Layout';
import Details from '../pages/Details';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App(){
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Badges} />
                    <Route exact path="/pokemon" component={Badges} />
                    <Route exact path="/pokemon/search" component={BadgeNew} />
                    <Route exact path="/pokemon/:pokemonName" component={Details} />
                    <Route component={NotFound} />    
                </Switch>
            </Layout>
        </BrowserRouter>
    )
}

export default App;