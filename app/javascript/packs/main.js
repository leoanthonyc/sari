import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import Entries from '../components/Entries';
import setupApolloClient from '../utils/setupApolloClient';
var client = setupApolloClient();
var App = function () { return (React.createElement(ApolloProvider, { client: client },
    React.createElement(Entries, null))); };
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(App, null), document.body.appendChild(document.createElement('div')));
});
