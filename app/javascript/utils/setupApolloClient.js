import { ApolloClient, InMemoryCache } from '@apollo/client';

const setupApolloClient = () => {
  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
  return client;
};

export default setupApolloClient;
