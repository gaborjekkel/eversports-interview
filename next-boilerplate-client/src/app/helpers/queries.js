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

export const PURCHASES_QUERY = `
  query Purchases($productIds: [ID], $userIds: [ID], $first: Int) {
    purchases(productIds: $productIds, userIds: $userIds, first: $first) {
      nodes {
        id
        product {
          id
          imageUrl
          name
        }
      }
    }
  }
`;