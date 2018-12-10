import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
// import { InMemoryCache } from 'apollo-boost';
// import { ApolloClient } from
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken, getCookies }) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include'
  });

  const authLink = setContext((_, { headers }) => {
    const cookies = getCookies();
    console.log('here', cookies);
    if (!process.brower) {
      console.log('cool');
    }
    // console.log('cookies', cookies);
    return {
      headers: {
        ...headers,
        cookie: cookies
        // authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
