import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Cli from '../pages/contents/Cli';
import About from '../pages/About';
import Posts from '../pages/contents/Posts';
import Post from '../pages/Post';
import Editor from '../pages/Editor';
import SpreadsheetReader from '../pages/contents/SpreadsheetReader';

export default function Routes() {
    return  (
        <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/post" exact component={Post} />
            <Route path="/editor" exact component={Editor} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/content/cli" exact component={Cli} />
            <Route path="/content/spreadsheet-reader" exact component={SpreadsheetReader} />
            <Route path="/about" exact component={About}/>
        </Switch>
    );
}
