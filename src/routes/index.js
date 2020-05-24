import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Cli from '../pages/contents/Cli';

export default function Routes() {
    return  (
        <Switch>
            <Route path="/" exact component={Cli} />
            <Route path="/content/cli" exact component={Cli} />
        </Switch>
    );
}
