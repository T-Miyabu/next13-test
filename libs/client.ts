import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { onError } from '@apollo/client/link/error';

export const { getClient } = registerApolloClient(() => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    // https://studio.apollographql.com/public/spacex-l4uc6p/
    uri:
      process.env.SCHEMA_PATH ||
      'http://dev-minimum-1388355598.ap-northeast-1.elb.amazonaws.com:80/graph/query',
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    // fetchOptions: { cache: "no-store" },
    headers: {
      'mini-api-key': process.env.MINI_API_KEY || ''
    }
  });

  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink])
  });
});
