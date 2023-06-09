import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {

  // const amplifyHost = `https://${process.env.AWS_BRANCH ? process.env.AWS_BRANCH : 'pr-' + process.env.AWS_PULL_REQUEST_ID}.${process.env.AWS_APP_ID}.amplifyapp.com`;

  // console.log(process.env.NODE_ENV)
  // console.log(amplifyHost)

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: 'http://localhost:3002/api/graphql'
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    })
  });
});