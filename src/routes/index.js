import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Cli from '../pages/contents/Cli';
import About from '../pages/About';

export default function Routes() {
    return  (
        <Switch>
            <Route path="/" exact component={Cli} />
            <Route path="/content/cli" exact component={Cli} />
            <Route path="/about" exact component={About}/>
        </Switch>
    );
}
