import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import Entries from '../components/Entries';
import setupApolloClient from '../utils/setupApolloClient';

const client = setupApolloClient();

const App = () => (
  <ApolloProvider client={client}>
    <Entries />
  </ApolloProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div'))
  );
});
