/* EXTERNALS */


import { gql } from '@apollo/client';


/* MAIN */


export const PRODUCTS_QUERY = gql`
  query Products($first: Int) {
    products(first: $first) {
      nodes {
        id
        name
      }
    }
  }
`;