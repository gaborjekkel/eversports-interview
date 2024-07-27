/* MAIN */


export const PRODUCTS_QUERY = `
  query Products($first: Int) {
    products(first: $first) {
      nodes {
        id
        name
      }
    }
  }
`;

export const USERS_QUERY = `
  query Users($first: Int) {
    users(first: $first) {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`;