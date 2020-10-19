import React from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../pages/About';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import Editor from '../pages/Editor';

export default function Routes() {
    return  (
        <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/about" exact component={About}/>
            <Route path="/posts" exact component={Posts} />
            <Route path="/post" exact component={Post} />
            <Route path="/editor" exact component={Editor} />
        </Switch>
    );
}
